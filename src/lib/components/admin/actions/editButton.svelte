<script>
	// @ts-nocheck
	import { fade } from 'svelte/transition';

	export let itemId; // ID of the food item to edit
	export let itemName; // Name of the food item (for display in the dialog)
	export let itemLabel; // Label of the food item
	export let itemDescription; // Description of the food item
	export let categoryType; // Category type of the food item
	export let itemImage; // Image URL of the food item

	let isDialogOpen = false;
	let loading = false;
	let isImageChanged = false; // Track if the image is changed
	let selectedFile = null; // Store the new image file
	let showUploadButton = false; // Track if the upload button should be visible
	let imagePreviewUrl = itemImage; // Set the initial image preview to the existing image URL
	let uploadStatus = ''; // To display the status of the image upload
	let isUploading = false; // Declare isUploading for upload button state

	// Form data bound to input fields
	let formData = {
		name: itemName,
		label: itemLabel,
		description: itemDescription,
		categoryType: categoryType
	};

	// Open the edit dialog
	function openDialog() {
		isDialogOpen = true;
	}

	// Close the edit dialog
	function closeDialog() {
		isDialogOpen = false;
	}

	// Handle the change of image selection
	function handleFileChange(event) {
		selectedFile = event.target.files[0];

		// Create a preview of the selected image
		if (selectedFile) {
			imagePreviewUrl = URL.createObjectURL(selectedFile);
			isImageChanged = true;
			showUploadButton = true; // Show the upload button when the image changes
		}
	}

	// Handle form submission
	async function handleSubmit(event) {
	event.preventDefault();
	loading = true;

	const updateData = {};

	// Compare formData with the original props and only add modified fields to updateData
	if (formData.name !== itemName) updateData.name = formData.name;
	if (formData.label !== itemLabel) updateData.label = formData.label;
	if (formData.description !== itemDescription) updateData.description = formData.description;
	if (formData.categoryType !== categoryType) updateData.categoryType = formData.categoryType;

	// If the image has changed, upload it first
	if (isImageChanged) {
		const uploadResponse = await handleUpload(); // Upload the new image
		if (uploadResponse) {
			updateData.imageUrl = uploadResponse; // Set new image URL in updateData
		} else {
			console.error('Image upload failed');
			loading = false;
			return;
		}
	}

	try {
		const response = await fetch(`/api/food/${itemId}`, {
			method: 'PATCH',
			body: JSON.stringify(updateData),
			headers: { 'Content-Type': 'application/json' }
		});

		if (!response.ok) throw new Error('Error updating item');

		const result = await response.json();
		console.log('Update result:', result);

		closeDialog();
	} catch (error) {
		console.error('Error:', error);
	} finally {
		loading = false;
	}
}

	// Handle the image upload to the server
	async function handleUpload() {
		if (!selectedFile) {
			alert('Please select a file first.');
			return null;
		}

		// Check for valid image formats
		const allowedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
		if (!allowedFormats.includes(selectedFile.type)) {
			alert('Unsupported file format. Please upload JPG or PNG.');
			return null;
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

			uploadStatus = 'Upload successful!';
			showUploadButton = false;
			isUploading = false; // Reset loading state
			return data.uploaded; // Return the new image URL
		} catch (error) {
			console.error('Error uploading file:', error);
			uploadStatus = 'Upload failed. Please try again.';
			isUploading = false; // Reset loading state
			return null; // Return null if the upload fails
		}
	}
</script>

<!-- Edit button -->
<button class="editButton" on:click={openDialog}>
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
		<path d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"></path>
	</svg>
</button>

<!-- Edit dialog -->
{#if isDialogOpen}
	<div class="dialog-backdrop" transition:fade>
		<form class="dialog" on:submit={handleSubmit}>
			<h1>Edit <br /> "{itemName}"</h1>
			<button class="closeDialogButton" on:click={closeDialog} type="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
					<path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
				</svg>
			</button>

			<!-- Form fields -->

			<!-- Category type -->
			<fieldset class="typeFieldset">
				<legend>Type</legend>
				<input type="radio" id="Entrees" name="type" value="1" bind:group={formData.categoryType} />
				<label for="Entrees">Entrees</label>
				<input type="radio" id="Plats" name="type" value="2" bind:group={formData.categoryType} />
				<label for="Plats">Plats</label>
				<input type="radio" id="Desserts" name="type" value="3" bind:group={formData.categoryType} />
				<label for="Desserts">Desserts</label>
			</fieldset>

			<!-- Label -->
			<label class="defaultLabel" for="customLabel">
				Label
				<input id="customLabel" type="text" placeholder={itemLabel} bind:value={formData.label} />
			</label>

			<!-- Name -->
			<label class="defaultLabel" for="itemName">
				Name
				<input id="itemName" type="text" placeholder={itemName} bind:value={formData.name} />
			</label>

			<!-- Description -->
			<label class="defaultLabel bigText" for="description">
				Description
				<textarea id="description" rows="3" placeholder={itemDescription} bind:value={formData.description}></textarea>
			</label>

			<!-- Image upload -->
			<label for="image_url" class="imgLabel">
				<div class="imgPreviewBox">
					 <img src={imagePreviewUrl} alt="Preview" class="imgPreview" />
					{#if !isImageChanged}
						<p class="onImageText">Click to change image</p>
					{/if}
				</div>
				<input type="file" id="image_url" on:change={handleFileChange} style="display: none;" />
			</label>

			<!-- Upload image button -->
			{#if showUploadButton}
				<button class="uploadImageButton" type="button" on:click={handleUpload} disabled={isUploading}>
					{#if isUploading}
						Uploading...
					{:else}
						Upload Image
					{/if}
				</button>
			{/if}

			<!-- Save button -->
			<button class="Submit" type="submit">
				{#if loading}Saving...
				{:else}Save{/if}
			</button>
		</form>
	</div>
{/if}


<style>
	.editButton {
		background: none;
		border: none;
		cursor: pointer;
	}

	.editButton svg {
		fill: #5271ff;
		transition: 0.2s linear;
		border-radius: 5px;
	}
	.editButton:hover svg {
		background-color: #5271ff;
		fill: white;
	}

	.closeDialogButton {
		display: flex;
		position: absolute;
		right: 0px;
		top: 0px;
		translate: -7.5px 7px;
		cursor: pointer;
		border: none;
		font-size: 15px;
		padding: 3px;
		scale: 1;
		transition: 0.2s ease-out all;
		border-radius: 5px;
		/* border:  1px #d5b602 solid; */
		box-shadow: inset #2a336295 0px 0px 3px;
		background-color: #374087;
		fill: #859aff;
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
		background: #121c48;
		color: #e4f1ff;
		padding: 5px 30px;
		border: 5px solid #859aff;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		text-shadow: none;
		font-family: coco-gothic;
		font-weight: lighter;
		box-shadow: inset #8599ff79 0px 0px 7px;
		max-width: 380px;
		max-height: 90%;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: #ffffff66 rgba(232, 232, 232, 0.342) !important;
		z-index: 3;
	}

	.dialog h1 {
		font-family: coco-gothic;
		font-weight: lighter;
		color: #859aff;
	}

	.typeFieldset {
		display: flex;
		position: relative;
		gap: 10px;
		padding: 0px 0px;
		padding-bottom: 10px;
		border: 1px #859aff solid;
		border: none;
		justify-content: center;
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
		color: #e4f1ff;
		background-color: #5271ff;
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
		background-color: #5271fa14;
	}
	/* Styles for the text input when it's not focused */

	.defaultLabel {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
	}

	.defaultLabel input[type='text'] {
		margin-bottom: 5px;
		color: #e4f1ff;
		background-color: #5271ff80;
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
		color: #e4f1ff;
		background-color: #5271ff80;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		transition: 0.2s linear all;
		outline: none;
		width: 100%;
		transition: 0s linear all;
	}

	.bigText textarea:focus,
	.defaultLabel input:focus {
		color: #5271ff;
		background-color: #e4f1ff;
		transition: all 0.2s linear;
	}

	.imgLabel {
		display: flex;
		width: 70%;
		justify-content: center;
		align-items: center;
		height: auto;
		margin: auto;
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
		width: 100%;
		margin: 5px 0px;
		box-sizing: content-box;
		cursor: pointer;
	}
	.onImageText {
		position: absolute;
		backdrop-filter: blur(5px);
		color: white;
		background-color: #121c4899;
		padding: 5px;
		border-radius: 5px;
		scale: 0.9;
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
		display: flex;
		justify-content: center;
	}

	.error {
		color: red;
		font-size: 1.2rem;
		margin-top: -5px;
	}

	button[type='submit'] {
		color: #e4f1ff;
		background-color: #37408779;
		font-family: coco-gothic;
		border-radius: 5px;
		cursor: pointer;
		padding: 0px 10px;
		padding-bottom: 0px;
		font-size: 2.1rem;
		font-weight: normal;
		transition: 0.2s ease-in-out all;
		/* border: 2px solid transparent; */
		box-shadow: inset #37408785 0px 0px 7px;
		border: none;
	}

	button[type='submit']:hover {
		color: #e4f1ff;
		background-color: #5271ff;
		box-shadow: inset #8c98f650 0px 0px 7px;
	}
</style>
