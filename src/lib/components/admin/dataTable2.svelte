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

	// Handle visibility change from the child component
	function updateVisibility(event) {
		const { itemId, visible } = event.detail;

		// Find the item in the data array and update its visibility
		const itemToUpdate = data.find((item) => item.id === itemId);
		if (itemToUpdate) {
			itemToUpdate.visible = visible;
		}
	}

	// Reactive statement to trigger the DOM update when data changes
	$: visibleItems = getItemsByCategory(selectedCategory);
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
			<div class="dataContainer">
				{#each getItemsByCategory(selectedCategory) as item}
					<div class="card">
						<div class="cardHeader">
							<h3 class="id">
								{item.id}
							</h3>
							<h3>
								{new Intl.DateTimeFormat('fr-FR', {
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
									hour: '2-digit',
									minute: '2-digit',
									timeZone: 'Europe/Paris',
									hour12: false
								}).format(new Date(item.date_added))}
							</h3>
						</div>
						<img class="foodPic {item.visible ? 'visible' : 'hidden'}" src={item.image_url} alt={`Image for ${item.name}`} />
						<div class="cardInfo {item.visible ? 'visible' : 'hidden'}" role="button" tabindex="0">
							<p>{item.label}</p>
							<h2>{item.name}</h2>
							<p>price goes here</p>
							<svg
								class="arrowSVG"
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								fill="#623e2a"
								viewBox="0 0 256 256"
								style="--darkreader-inline-fill: #060606;"
								data-darkreader-inline-fill=""
							>
								<path
									d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
								></path>
							</svg>
							<p class="discription">{item.description}</p>
						</div>
						<div class="actions">
							<div style="margin-left: -3px;">
								<EditButton
									itemId={item.id}
									categoryType={item.category_name}
									itemName={item.name}
									itemLabel={item.label}
									itemDescription={item.description}
									itemImage={item.image_url}
								/>
								<DeleteButton itemId={item.id} itemName={item.name} />
							</div>
							<VisibilityButton
								itemId={item.id}
								visible={item.visible}
								on:visibilityChanged={updateVisibility}
							/>
						</div>
					</div>
				{/each}
			</div>
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
		/* position: relative; */
		width: 90vw;
		background-color: #ffffff9a;
		border: #d6b78599 1.5px solid;
		border-radius: 5px;
		margin: auto;
		padding: 20px;
		overflow: hidden;
		box-sizing: border-box;
	}
	h2 {
		min-height: 70.6px;
		font-size: 2rem;
	}
	.tableContainer {
		min-width: 50vw;
		/* max-height: 78vh; */
		height: fit-content;
	}
	.cardHeader {
		display: flex;
		justify-content: space-between;
		font-family: RobotoCondensed;
		font-size: 1.2rem;
	}
	.id {
		opacity: 0.5;
	}
	h3 {
		font-weight: lighter;
	}
	.dataContainer {
		display: flex;
		width: 100%;
		border: #d6b785 1.5px solid;
		flex-direction: row;
		justify-content: start;
		align-items: start;
		gap: 20px;
		overflow-x: auto;
		scrollbar-width: thin;
		background-color: white;
		scrollbar-color: #623e2ab9 transparent;
		box-sizing: border-box;
		border-radius: 5px;
		margin-top: 20px;
		padding: 8px 20px;
	}
	.card {
		width: 300px;
		display: flex;
		flex-direction: column;
		color: #623e2a;
		text-shadow: none;
		/* background-color: #623e2a; */
	}

	.cardInfo {
		border: 1px #623e2a solid;
		width: 300px;
		padding: 10px;
		margin-top: 10px;
		font-family: RobotoCondensed;
		font-weight: light;
		overflow-wrap: normal;
		position: relative;
		min-height: 130.4px;
		box-sizing: border-box;
		text-align: start;
		/* background-color: #f4f1ed; */
		/* box-shadow: rgba(0, 0, 0, 0.375) 0px 0.6px 3.5px inset; */
	}
	.cardInfo p {
		font-size: 1.4rem;
		font-weight: lighter;
		font-family: RobotoCondensed;
	}

	.foodPic {
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		object-position: center;
		display: flex;
		/* box-shadow: rgba(0, 0, 0, 0.485) 0px 0.6px 3.5px inset; */
	}

	.discription {
		background-color: #623e2a;
		padding: 0px;
		height: 0px;
		margin: -10px;
		box-sizing: border-box;
		margin-top: 10px;
		color: #f4f1ed;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		transition: all ease-in-out 0.35s;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #f4f1ed8a transparent;
	}

	.arrowSVG {
		position: absolute;
		right: 10px;
		/* bottom: 10px; */
		translate: 0% -100%;
		transition: all ease-in-out 0.5s;
		transform: scale(1, 1);
	}

	.cardInfo:focus-within .discription {
		display: flex;
		height: 80px;
		padding: 10px;
		transition: all ease-in-out 0.35s;
	}

	.cardInfo:focus-within .arrowSVG {
		transform: scale(1, -1);
		transition: all ease-in-out 0.5s;
	}

	/* if there is no text in the description the arrow and the discription dissapear */
	.card:has(.discription:empty) :where(.discription, .arrowSVG) {
		display: none;
	}

	.card:has(.discription:not(:empty)) .cardInfo {
		cursor: pointer;
	}

	.category-buttons {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: #d6b78599 1.5px solid;
		border-radius: 5px;
		background-color: white;
		padding: 5px;
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
	.actions {
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	.addRefreshDiv {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.hidden {
		opacity: 0.5;
	}

	@media only screen and (max-width: 560px) {
		.card {
			width: 230px;
		}
		.categoryButton {
			font-size: 2.1rem;
		}
		.cardInfo {
			/* width: 300px; */
			/* min-height: 130.4px; */
			width: 230px;
			min-height: 107.4px;
		}
		h2 {
			/* min-height: 70.6px; */
			/* font-size: 2rem; */
			min-height: 62.6px;
			font-size: 1.7rem;
		}

		.cardHeader {
			/* font-size: 1.2rem; */
			font-size: 1rem;
		}

		.cardInfo p {
			/* font-size: 1.4rem; */
			font-size: 1.3rem;
		}
	}

	@media only screen and (max-width: 400px) {
		.addRefreshDiv {
			justify-content: center;
		}
		.category-buttons {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		/* Inline #7 | http://localhost:5173/admin */

		.card {
			width: 300px;
		}

		.cardInfo {
			/* width: 300px; */
			/* min-height: 130.4px; */
			width: 200px;
			min-height: 107.4px;
		}

		h2 {
			/* min-height: 70.6px; */
			/* font-size: 2rem; */
			min-height: 62.6px;
			font-size: 1.4rem;
		}

		.cardHeader {
			/* font-size: 1.2rem; */
			font-size: 0.9rem;
		}

		.cardInfo p {
			/* font-size: 1.4rem; */
			font-size: 1.1rem;
		}

		svg {
			scale: 0.8;
		}
	}
</style>
