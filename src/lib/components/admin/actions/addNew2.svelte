<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	let isDialogOpen = false;
	let label = '';
	let imageUrl = '';
	let itemName = '';
	let description = '';
	let categoryType = 1; // Default value for category type
	let selectedFile = null;
	let showUploadButton = false;
	let uploadStatus = '';
	let imagePreviewUrl = ''; // To hold the image preview URL
	let isUploading = false; // Loading state for image upload
	const dispatch = createEventDispatcher(); // To dispatch an event after form submission for data refresh

	// Form validation error messages
	let errors = {
		label: '',
		imageUrl: '',
		itemName: '',
		// description: '',
		categoryType: ''
	};

	function openDialog() {
		isDialogOpen = true;
	}

	function closeDialog() {
		isDialogOpen = false;
		// Do not reset form fields on close, so no call to resetForm() here
	}

	// Reset form fields and clear validation errors after submission
	function resetForm() {
		label = '';
		imageUrl = '';
		itemName = '';
		description = '';
		categoryType = 1; // Reset to default value
		selectedFile = null;
		imagePreviewUrl = ''; // Clear image preview
		showUploadButton = false;
		uploadStatus = '';
		errors = { label: '', imageUrl: '', itemName: '', categoryType: '' };
		clearRadioSelection(); // Clear radio button selection
	}

	function handleLabelChange(event) {
		label = event.target.value ?? '';
	}

	function handleTypeChange(event) {
		categoryType = parseInt(event.target.value, 10) ?? 1;
	}

	function clearRadioSelection() {
		const radios = document.querySelectorAll('input[type="radio"][name="predefined-label"]');
		radios.forEach((radio) => {
			radio.checked = false;
		});
	}

	async function handleFileChange(event) {
		if (!event || !event.target || !event.target.files) return;
		selectedFile = event.target.files[0];

		// Create a preview of the selected image
		if (selectedFile) {
			imagePreviewUrl = URL.createObjectURL(selectedFile);
			showUploadButton = true;
		}
	}

	async function handleUpload() {
		if (!selectedFile) {
			alert('Please select a file first.');
			return;
		}

		isUploading = true; // Set loading state

		try {
			const formData = new FormData();
			formData.append('file', selectedFile);

			const response = await fetch('/api/upload-image', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Upload failed.');
			}

			const data = await response.json();
			if (!data.uploaded) {
				throw new Error('Invalid response from server.');
			}

			imageUrl = data.uploaded;
			uploadStatus = 'Upload successful!';
			showUploadButton = false;
			isUploading = false; // Reset loading state
		} catch (error) {
			console.error('Error uploading file:', error);
			uploadStatus = 'Upload failed. Please try again.';
			isUploading = false; // Reset loading state
		}
	}

	// Validate form fields
	function validateForm() {
		let isValid = true;

		// Reset errors before validating
		errors = { label: '', imageUrl: '', itemName: '', categoryType: '' };

		// Validate item name
		if (!itemName) {
			errors.itemName = 'Item Name is required';
			isValid = false;
		}

		// Validate description
		// if (!description) {
		// 	errors.description = 'Description is required';
		// 	isValid = false;
		// }

		// Validate image
		if (!imageUrl) {
			errors.imageUrl = "Don't forget to upload an image!";
			isValid = false;
		}

		// Validate label
		if (!label) {
			errors.label = 'Label is required';
			isValid = false;
		}

		// Validate category type
		if (!categoryType) {
			errors.categoryType = 'Category type is required';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// Perform form validation before submission
		if (!validateForm()) {
			console.log('Form is invalid:', errors);
			return;
		}

		// Create form data
		const formData = new FormData();
		formData.append('label', label);
		formData.append('itemName', itemName);
		formData.append('description', description);
		formData.append('image_url', imageUrl); // Ensure this matches the key in your server-side code
		formData.append('type', categoryType.toString()); // Ensure categoryType is added

		try {
			const response = await fetch('/admin', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Form submission failed.');
			}

			console.log('Form submitted successfully.');

			// Reset form fields only after successful submission
			resetForm();

			// Close the dialog after form submission
			closeDialog();

			// Dispatch a custom event to notify parent to refresh the data
			dispatch('refresh');
		} catch (error) {
			console.error('Error submitting form:', error);
		}
	}
</script>

<!-- Button to open the dialog -->
<button class="addButton" on:click={openDialog}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="#000000"
		viewBox="0 0 256 256"
	>
		<path
			d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"
		></path>
	</svg>
	Add New
</button>

{#if isDialogOpen}
	<div class="dialog-backdrop" transition:fade>
		<form class="dialog" on:submit={handleSubmit}>
			<h1>Create New Item</h1>
			<button class="closeDialogButton" on:click={closeDialog} type="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
					<path
						d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
					></path>
				</svg>
			</button>

			<!-- Validation Errors -->

			<!-- {#if errors.description}<p class="error">{errors.description}</p>{/if} -->

			<fieldset class="typeFieldset">
				<legend>Type</legend>
				<input
					type="radio"
					id="Entrees"
					name="type"
					value="1"
					checked={categoryType === 1}
					on:change={handleTypeChange}
				/>
				<label for="Entrees">Entrees</label>
				<input
					type="radio"
					id="Plats"
					name="type"
					value="2"
					checked={categoryType === 2}
					on:change={handleTypeChange}
				/>
				<label for="Plats">Plats</label>
				<input
					type="radio"
					id="Desserts"
					name="type"
					value="3"
					checked={categoryType === 3}
					on:change={handleTypeChange}
				/>
				<label for="Desserts">Desserts</label>
			</fieldset>

			<fieldset class="labelsFieldset">
				<legend style="text-align: left">Label
					{#if errors.label}<p class="error">{errors.label}</p>{/if}
				</legend>
				<!-- Radio buttons for predefined labels -->
				<div>
					<input
						type="radio"
						id="BestSellerLabel"
						name="predefined-label"
						value="Best Seller"
						on:change={handleLabelChange}
					/>
					<label for="BestSellerLabel">Best Seller</label>
				</div>
				<div>
					<input
						type="radio"
						id="NewLabel"
						name="predefined-label"
						value="New"
						on:change={handleLabelChange}
					/>
					<label for="NewLabel">New</label>
				</div>
				<div>
					<input
						type="radio"
						id="SignatureDishLabel"
						name="predefined-label"
						value="Signature Dish"
						on:change={handleLabelChange}
					/>
					<label for="SignatureDishLabel">Signature Dish</label>
				</div>

				<!-- Text input for custom label -->
				<div>
					<input
						type="text"
						name="custom-label"
						id="CustomLabel"
						placeholder="Custom label"
						on:focus={clearRadioSelection}
						on:input={handleLabelChange}
					/>
				</div>
			</fieldset>
			<label class="defaultLabel" for="itemName">
				Name
				{#if errors.itemName}<span class="error">{errors.itemName}</span>{/if}
				<input type="text" bind:value={itemName} />
			</label>

			<label class="defaultLabel bigText" for="description">
				Description
				<textarea id="description" rows="3" bind:value={description}></textarea>
			</label>

			<!-- Image Upload Field -->
			{#if errors.imageUrl}<p class="error">{errors.imageUrl}</p>{/if}
			<label for="image_url" class="imgLabel">
				<!-- Preview the image if selected -->
				<p class="imgPreviewBox">
					{#if imagePreviewUrl}
						<img src={imagePreviewUrl} alt="Preview" class="imgPreview" />
					{:else}
						Image
					{/if}
				</p>
				<input type="file" id="image_url" on:change={handleFileChange} style="display: none;" />
			</label>

			{#if !showUploadButton}
				<button class="uploadImageButton" type="button" disabled style="cursor: default;">
					{#if uploadStatus}
						{uploadStatus}
					{:else}
						Upload Image
					{/if}
				</button>
			{:else}
				<button
					class="uploadImageButton"
					style="opacity: 1;"
					type="button"
					on:click={handleUpload}
					disabled={isUploading}
				>
					{#if isUploading}
						Uploading...
					{:else}
						Upload Image
					{/if}
				</button>
			{/if}

			<button type="submit">Finish</button>
		</form>
	</div>
{/if}

<style>
	/* Button styling */
	.addButton {
		position: absolute;
		right: 0px;
		bottom: 6.6px;
		color: #623e2a;
		background-color: #ebe1d2;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px 10px;
		gap: 5px;
		font-family: Calibri;
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: 1px;
		border: none;
		border-radius: 5px;
		scale: 1;
		transition: 0.2s linear;
		cursor: pointer;
	}

	.addButton svg {
		fill: #623e2a;
		transition: 0.2s linear;
	}

	.addButton:hover {
		color: #ebe1d2;
		background-color: #623e2a;
	}

	.addButton:hover svg {
		fill: #ebe1d2;
	}

	.closeDialogButton {
		display: flex;
		position: absolute;
		right: 0px;
		top: 0px;
		translate: -7.5px 7px;
		cursor: pointer;
		background-color: transparent;
		fill: #623e2a;
		border: none;
		font-size: 15px;
		padding: 3px;
		scale: 1;
		transition: 0.2s ease-out all;
		border-radius: 5px;
		/* border:  1px #d5b602 solid; */
		box-shadow: inset #623e2a95 0px 0px 3px;
	}
	.closeDialogButton:hover {
		/* scale: 1.2; */
		fill: rgb(255, 255, 255);
		background-color: rgba(255, 0, 0, 0.379);
		box-shadow: inset #d5020295 0px 0px 3px;
	}

	/* Dialog styling */
	.dialog-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 2;
	}

	.dialog {
		position: relative;
		background: rgb(235, 225, 210);
		color: #623e2a;
		padding: 5px 30px;
		border: 5px solid #d6b785;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		text-shadow: none;
		font-family: coco-gothic;
		font-weight: lighter;
		box-shadow: inset #d5b50295 0px 0px 7px;
		max-width: 380px;
		max-height: 80%;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #ffffff66 rgba(232, 232, 232, 0.342) !important;
		z-index: 3;
	}

	.dialog h1 {
		font-family: coco-gothic;
		font-weight: lighter;
		color: #d5b602;
	}

	.typeFieldset {
		display: flex;
		gap: 10px;
		padding: 0px 0px;
		padding-bottom: 10px;
		border: 1px #d5b602 solid;
		border: none;
	}
	.typeFieldset input {
		display: none;
	}

	.typeFieldset label {
		font-family: catchymager;
		border-radius: 5px;
		cursor: pointer;
		padding: 2px 5px;
		padding-bottom: 0px;
		font-size: 2.1rem;
		font-weight: normal;
		transition: 0.3s ease-in-out all;
		/* border: 2px solid transparent; */
		box-shadow: inset #623e2a00 0px 0px 7px;
	}

	.typeFieldset input[type='radio']:checked + label {
		/* border: #623e2a solid 2px; */
		/* box-shadow: inset #623e2a6a 0px 0px 7px;
		background-color: #623e2a17; */
		color: #ebe1d2;
		background-color: #623e2a;
	}

	.labelsFieldset {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 0px 0px;
		padding-bottom: 10px;
		align-items: start;
		border: none;
	}
	.labelsFieldset div {
		display: flex;
		justify-content: start;
		align-items: center;
		min-width: 50%;
		gap: 5px;
	}
	.labelsFieldset div label {
		width: 90%;
		text-align: start;
		cursor: pointer;
	}

	.labelsFieldset div label:hover {
		background-color: #623e2a14;
	}
	/* Styles for the text input when it's not focused */
	.labelsFieldset input[type='radio'] {
		appearance: none;
		border: none;
		height: 15px;
		width: 15px;
		/* box-shadow: inset #623e2a6a 0px 0px 7px; */

		border-radius: 2px;
		/* padding: 0px; */
		box-shadow: inset #623e2a6a 0px 0px 7px;
		background-color: #623e2a17;
		transition: 0.2s linear all;
		cursor: pointer;
	}

	.labelsFieldset input[type='radio']:checked {
		background-color: #623e2a;
	}

	#CustomLabel {
		margin-top: 5px;
		background-color: #f3eee5;
		color: #623e2a;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		transition: 0.2s linear all;
		outline: none;
	}

	.labelsFieldset #CustomLabel:not(:placeholder-shown) {
		color: #ebe1d2; /* Change the background color */
		background-color: #623e2a; /* Change the text color */
	}

	.labelsFieldset #CustomLabel:focus {
		color: #ebe1d2; /* Change the background color */

		background-color: #623e2a; /* Change the text color */
	}

	.defaultLabel {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}

	.defaultLabel input[type='text'] {
		margin-bottom: 5px;
		background-color: #f3eee5;
		color: #623e2aac;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		/* transition: 0.2s linear all; */
		outline: none;
		width: 100%;
		transition: 0s linear all;
	}

	.bigText textarea {
		min-height: 80px; /* Minimum height */
		max-width: 100%; /* Ensures the textarea doesn't exceed the form width */
		min-width: 100%;
		margin-bottom: 5px;
		overflow: hidden; /* Prevents scrollbars unless necessary */
		text-align: left;
		resize: both; /* Allows the textarea to be resizable both horizontally and vertically */
		background-color: #f3eee5;
		color: #623e2aac;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		transition: 0.2s linear all;
		outline: none;
		width: 100%; /* Matches the input fields' width */
		transition: 0s linear all;
	}

	.bigText textarea:focus {
		color: #623e2a; /* Matches the input's focus color */
		background-color: #f3eee5; /* Matches the input's background color */
	}

	.imgLabel {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		height: auto;
	}

	.imgPreview {
		width: 100%;
		height: auto;
		aspect-ratio: 4/3;
		object-fit: cover;
		object-position: center;
		/* margin: 10px 0px; */
		border-radius: 5px;
	}

	.imgPreviewBox {
		height: auto;
		background-color: #d6b785;
		aspect-ratio: 4/3;
		display: flex;
		border-radius: 5px;
		margin: 5px auto;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 70%;
		margin: 5px 0px;
		box-sizing: content-box;
		cursor: pointer;
	}

	.uploadImageButton {
		cursor: pointer;
		width: 70%;
		margin: 3px auto;
		text-align: center;
		padding: 3px 0px;
		border: 1px #71a87166 solid;
		border-radius: 5px;
		background: #9ad69a;
		color: #008000;
		box-shadow: #00800094 0px 0px 2px inset;
		opacity: 0.5;
		display: flex;
		justify-content: center;
	}

	.error{
		color: red;
		font-size: 1.2rem;
		margin-top: -5px;
	}

	button[type='submit'] {
		color: #623e2a;
		background-color: #623e2a34;
		font-family: coco-gothic;
		border-radius: 5px;
		cursor: pointer;
		padding: 0px 10px;
		padding-bottom: 0px;
		font-size: 2.1rem;
		font-weight: normal;
		transition: 0.3s ease-in-out all;
		/* border: 2px solid transparent; */
		box-shadow: inset #623e2a85 0px 0px 7px;
		border: none;
	}

	button[type='submit']:hover {
		color: #ebe1d2;
		background-color: #623e2a;
	}
</style>
