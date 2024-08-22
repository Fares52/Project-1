<script>
// @ts-nocheck

	let items = [
		{
			id: 1,
			title: 'Salad',
			description: 'LoremIpsum',
			image: 'test.jpg',
			dateAdded: '20/08/2024',
			category: 'Plats',
			visible: true
		},
		{
			id: 2,
			title: 'Soup',
			description: 'Delicious soup',
			image: 'test.jpg',
			dateAdded: '21/08/2024',
			category: 'Plats',
			visible: true
		},
		{
			id: 3,
			title: 'Cake',
			description: 'Sweet dessert',
			image: 'test.jpg',
			dateAdded: '22/08/2024',
			category: 'Desserts',
			visible: true
		},
		{
			id: 4,
			title: 'Burger',
			description: 'Juicy and delicious',
			image: 'test.jpg',
			dateAdded: '25/08/2024',
			category: 'Entrees',
			visible: true
		},
		{
			id: 5,
			title: 'Salad',
			description: 'LoremIpsum',
			image: 'test.jpg',
			dateAdded: '20/08/2024',
			category: 'Plats',
			visible: true
		},
		{
			id: 6,
			title: 'Soup',
			description: 'Delicious soup',
			image: 'test.jpg',
			dateAdded: '21/08/2024',
			category: 'Plats',
			visible: true
		},
		{
			id: 7,
			title: 'Ice Cream',
			description: 'Cold and creamy',
			image: 'test.jpg',
			dateAdded: '23/08/2024',
			category: 'Desserts',
			visible: true
		},
		{
			id: 8,
			title: 'Pizza',
			description: 'Cheesy goodness',
			image: 'test.jpg',
			dateAdded: '24/08/2024',
			category: 'Entrees',
			visible: true
		},
		{
			id: 9,
			title: 'Ice Cream',
			description: 'Cold and creamy',
			image: 'test.jpg',
			dateAdded: '23/08/2024',
			category: 'Desserts',
			visible: true
		}
	];

	let showAll = true;

	function toggleVisibility() {
		showAll = !showAll;
	}
	let selectedCategory = 'Entrees';

	function selectCategory(category) {
		selectedCategory = category;
		// Update table display logic based on selectedCategory
		console.log('Selected category:', category);
	}
</script>

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
			<button class="addButton">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="#000000"
					viewBox="0 0 256 256"
					style="--darkreader-inline-fill: #060606;"
					data-darkreader-inline-fill=""
					><path
						d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"
					>
					</path>
				</svg>
				Add New
			</button>
			<!-- <button on:click={toggleVisibility}>
              {showAll ? 'Hide Hidden' : 'Show All'}
            </button> -->
		</div>

		{#each ['Plats', 'Desserts', 'Entrees'] as category}
			<div class="table-container {selectedCategory === category ? 'active' : ''}">
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Description</th>
							<th>Image</th>
							<th>Date Added</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody class="{category.toLowerCase()}Table">
						{#each items.filter((item) => item.category === category && (showAll || item.visible)) as item}
							<tr>
								<th scope="row">{item.id}</th>
								<td>{item.title}</td>
								<td>{item.description}</td>
								<td><img src={item.image} alt="Image for {item.title}" /></td>
								<td>{item.dateAdded}</td>
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
													>
													</path>
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
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		height: fit-content;
		width: fit-content;
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
		border: #d6b785 0px solid;
		box-sizing: border-box;
		border-spacing: 0px;
		/* border-radius: 5px; */
		width: 100%;
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
	}
	thead {
		color: #623e2a;
		background-color: #ebe1d2;
		font-family: Calibri;
		font-weight: lighter;
		font-size: 1.7rem;
	}

	thead th {
		padding: 10px 20px;
		background-color: #ebe1d2;
	}
	td:has(.actionButtonsDiv) {
		width: 170px;
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

	.table-container {
		display: none;
	}
	.table-container.active {
		display: block;
	}
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
