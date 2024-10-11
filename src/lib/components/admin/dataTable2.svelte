<script>
	// @ts-nocheck
	import AddButton from '$lib/components/admin/actions/addButton.svelte';
	import RefreshData from '$lib/components/admin/actions/refreshData.svelte';
	import { createEventDispatcher } from 'svelte';
	import DeleteButton from '$lib/components/admin/actions/deleteButton.svelte';
	import EditButton from '$lib/components/admin/actions/editButton.svelte';
	import VisibilityButton from '$lib/components/admin/actions/visibilityButton.svelte';

	export let data = [];

	let showAll = true;
	let selectedCategory = 'Entrees';

	function toggleVisibility() {
		showAll = !showAll;
	}

	function selectCategory(category) {
		selectedCategory = category;

		console.log('Selected category:', category);
		handleRefresh();
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

	// Handle itemDeleted event to refresh data
	window.addEventListener('itemDeleted', (event) => {
		const deletedItemId = event.detail.itemId;
		data = data.filter((item) => item.id !== deletedItemId); // Remove the deleted item from the array
	});
</script>

<!--
  @component
  ## Next up!!!!!!!!!!!!!!!!: 	
  - Add visibility button
  - finish the user page 
-->

<section>
	<div class="tableContainer">
		<div class="category-buttons">
			<div class="categoryButtonDiv">
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
			</div>
			<div class="addRefreshDiv">
				<RefreshData on:refresh={handleRefresh} />
				<AddButton />
			</div>
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
							<td class="descriptionTd">{item.description}</td>
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
									<EditButton
										itemId={item.id}
										categoryType={item.category_name}
										itemName={item.name}
										itemLabel={item.label}
										itemDescription={item.description}
										itemImage={item.image_url}
									/>
									<DeleteButton itemId={item.id} itemName={item.name} />
									<VisibilityButton itemId={item.id} visible={item.visible} />
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
	* {
		box-sizing: content-box;
	}
	section {
		height: fit-content;
		width: 90vw;
		background-color: white;
		border: #ebe1d2 3px solid;
		border-radius: 5px;
		margin: 20px auto;
		padding: 20px;
		overflow: hidden;
		box-sizing: border-box;
	}

	.tableContainer {
		min-width: 50vw;
		height: 78vh;
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
		width: 100%;
		height: 90%;
		overflow: auto;
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
	.descriptionTd {
		min-width: 250px;
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
		aspect-ratio: 4/3;
		object-fit: cover;
		object-position: center;
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
		justify-content: space-between;
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

	.addRefreshDiv {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	@media only screen and (max-width: 560px) {
		thead {
			font-size: 1.7rem;
		}
		thead th {
			padding: 3px;
		}
		table {
			font-size: 1.3rem;
		}
		table th {
			padding: 3px;
		}
		table td {
			padding: 3px;
		}
		td:has(img) {
			padding: 5px;
		}
		td img {
			width: 135px;
		}
		.actionButtonsDiv {
			scale: 0.8;
		}
		.categoryButton {
			font-size: 2.1rem;
		}
	}

	@media only screen and (max-width: 400px) {
		.addRefreshDiv{
			justify-content: center;
		}
		.category-buttons {
		display: flex;
		flex-direction: column;
	}
	table{
		margin-top: 5px;
	}
	}
</style>
