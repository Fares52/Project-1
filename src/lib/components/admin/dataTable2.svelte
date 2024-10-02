<script>
	// @ts-nocheck
	import AddNew2 from '$lib/components/admin/actions/addNew2.svelte';
	import RefreshData from '$lib/components/admin/actions/refreshData.svelte';
	import { createEventDispatcher } from 'svelte';

	export let data = [];

	let showAll = true;
	let selectedCategory = 'Entrees';

	function toggleVisibility() {
		showAll = !showAll;
	}

	function selectCategory(category) {
		selectedCategory = category;
		console.log('Selected category:', category);
	}

	// Filter items based on the selected category
	function getItemsByCategory(category) {
		// Since `data` is an array, filter directly on it
		return data.filter((item) => item.category_name === category);
	}

	const dispatch = createEventDispatcher();

	function handleRefresh() {
    console.log('Refresh event caught in DataTable2');
    dispatch('refresh'); // Forward the event to the parent

    // Force re-select the current category to trigger a re-render
    const currentCategory = selectedCategory; // Store the current category
    selectedCategory = ''; // Temporarily reset the category to trigger reactivity
    setTimeout(() => {
        selectedCategory = currentCategory; // Re-apply the selected category after a brief pause
    }, 0);
}
</script>

<!--
  @component
  ## Some bugs that need fixing:
  `refresh button does update data however it doesnt automatically display itself, the user must change between categories to see new changes`
-->

<section>
	<div class="tableContainer">
		<div class="category-buttons">
			<button
				class="categoryButton {selectedCategory === 'Entrees' ? 'active' : ''}"
				on:click={() => selectCategory('Entrees')}>Entrees</button
			>
			<button
				class="categoryButton {selectedCategory === 'Plats' ? 'active' : ''}"
				on:click={() => selectCategory('Plats')}>Plats</button
			>
			<button
				class="categoryButton {selectedCategory === 'Desserts' ? 'active' : ''}"
				on:click={() => selectCategory('Desserts')}>Desserts</button
			>

			<AddNew2 />
			<RefreshData on:refresh={handleRefresh} />
		</div>

		<!-- Check if data exists and display table -->
		{#if data.length > 0}
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Label</th>
						<th>Description</th>
						<th>Image</th>
						<th>Date Added</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each getItemsByCategory(selectedCategory) as item}
						<tr>
							<th scope="row">{item.id}</th>
							<td>{item.name}</td>
							<td>{item.label}</td>
							<td>{item.description}</td>
							<td><img src={item.image_url} alt={`Image for ${item.name}`} /></td>
							<td>
								{new Intl.DateTimeFormat('fr-FR', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
									hour: '2-digit',
									minute: '2-digit',
									timeZone: 'Europe/Paris',
									hour12: false
								}).format(new Date(item.date_added))}
							</td>
							<td>
								<div class="actionButtonsDiv">
									<button class="editButton">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											fill="#000000"
											viewBox="0 0 256 256"
											style="--darkreader-inline-fill: #060606;"
											data-darkreader-inline-fill=""
											><path
												d="M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z"
											></path>
										</svg>
									</button>
									<button class="deleteButton">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											fill="#000000"
											viewBox="0 0 256 256"
											style="--darkreader-inline-fill: #060606;"
											data-darkreader-inline-fill=""
											><path
												d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"
											></path></svg
										>
									</button>
									<form class="visibilityForm">
										<label for="eye-{item.id}">
											<input type="checkbox" id="eye-{item.id}" />
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="32"
												height="32"
												class="openEye"
												fill="#000000"
												viewBox="0 0 256 256"
												style="--darkreader-inline-fill: #060606;"
												data-darkreader-inline-fill=""
												><path
													d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"
												></path>
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="32"
												height="32"
												class="closedEye"
												fill="#000000"
												viewBox="0 0 256 256"
												style="--darkreader-inline-fill: #060606;"
												data-darkreader-inline-fill=""
												><path
													d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.87,35.22a8,8,0,0,1-6.58,9.21A8.4,8.4,0,0,1,160,200a8,8,0,0,1-7.88-6.69l-5.77-34.58a133.06,133.06,0,0,1-36.68,0l-5.77,34.58A8,8,0,0,1,96,200a8.4,8.4,0,0,1-1.32-.11,8,8,0,0,1-6.58-9.21L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172A8,8,0,1,1,25.06,164l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.6,20.54,45.64,45,89.78,45s73.18-24.49,89.78-45A8,8,0,1,1,230.22,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"
												></path>
											</svg>
										</label>
									</form>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<h2>No data available</h2>
		{/if}
	</div>
</section>

<style>
	section {
		height: fit-content;
		width: 90vw;
		background-color: white;
		border: #ebe1d2 3px solid;
		border-radius: 5px;
		margin: 20px auto;
		padding: 20px;
	}

	.tableContainer {
		min-width: 50vw;
		max-height: 78vh;
	}

	table {
		margin: 0px auto;
		margin-top: 20px;
		text-shadow: none;
		border: #d6b785 1px solid;
		border-right: none;
		box-sizing: border-box;
		border-spacing: 0px;
		/* border-radius: 5px; */
		width: fit-content;
		height: 500px;
		overflow-y: scroll;
		display: block;
		scrollbar-width: thin;
	}
	th,
	td {
		border: 1px #d6b785 solid;
		background-color: #f4f1ed;
		padding: 10px 20px;
		color: #623e2a;
		font-family: coco-gothic;
		text-align: center;
		vertical-align: center;
		max-width: 250px;
		line-break: auto;
		overflow: hidden;
	}
	thead {
		color: #623e2a;
		background-color: #ebe1d2;
		font-family: Calibri;
		font-weight: lighter;
		font-size: 1.7rem;
		position: sticky;
		top: 0px;
		z-index: 1;
	}

	thead th {
		padding: 10px 20px;
		background-color: #ebe1d2;
	}
	td:has(.actionButtonsDiv) {
		width: 170px;
	}
	td img {
		width: 200px;
		height: auto;
	}
	.actionButtonsDiv {
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
	}
	.category-buttons {
		position: relative;
		display: flex;
		gap: 10px;
	}
	.categoryButton {
		border: none;
		justify-content: center;
		align-items: center;
		padding: 2px 5px;
		background-color: transparent;
		border-radius: 5px;
		font-family: catchymager;
		font-size: 3rem;
		color: #623e2a;
		text-shadow: none;
		cursor: pointer;
		transition: all 0.3s linear;
	}
	.categoryButton.active {
		color: #ebe1d2;
		background-color: #623e2a;
	}
	/* tbody {
		transition: all 0.2s linear;
	} */

	/* .table-container {
		display: none;
	}
	.table-container.active {
		display: block;
	} */
	.actionButtonsDiv {
		display: flex;
	}
	.editButton,
	.deleteButton {
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
	.deleteButton svg {
		fill: #ff3131;
		transition: 0.2s linear;
		border-radius: 5px;
		bottom: 0px;
	}
	.deleteButton:hover svg {
		background-color: #ff3131;
		fill: white;
	}
	.visibilityForm label {
		position: relative;
		margin: auto;
		cursor: pointer;
	}
	.openEye {
		display: none;
	}
	.closedEye {
		display: block;
	}
	.visibilityForm {
		width: fit-content;
		display: flex;
		justify-content: center;
		margin-left: 5px;
	}
	.visibilityForm input[type='checkbox']:checked + .openEye {
		display: block;
	}
	.visibilityForm input[type='checkbox']:checked ~ .closedEye {
		display: none;
	}
	.visibilityForm input {
		display: none;
	}
	.visibilityForm svg {
		fill: #545454;
	}
</style>
