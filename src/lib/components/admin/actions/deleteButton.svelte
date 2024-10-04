<script>
	// @ts-nocheck
	
	import { fade } from "svelte/transition";

    export let itemId;          // ID of the food item to delete
    export let itemName;        // Name of the food item (for display in the dialog)
    let isDialogOpen = false;
    let loading = false;        // To show loading state during deletion

    function openDialog() {
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    async function deleteItem() {
        loading = true;
        try {
            const response = await fetch(`/api/food/${itemId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the item');
            }

            console.log(`Item ${itemId} deleted successfully.`);
            closeDialog();

            // Optionally, you could emit an event to notify the parent component
            // so it can refresh the data or update the UI.
            const event = new CustomEvent('itemDeleted', { detail: { itemId } });
            window.dispatchEvent(event);
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            loading = false;
        }
    }
</script>

<button class="deleteButton" on:click={openDialog}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
    </svg>
</button>

{#if isDialogOpen}
    <div class="dialog-backdrop" transition:fade>
        <div class="dialog">
            <h1>Delete "{itemName}"?</h1>
			<button class="closeDialogButton" on:click={closeDialog} type="button">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256">
					<path
						d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
					></path>
				</svg>
			</button>
            <button class="no" on:click={closeDialog} type="button">Cancel</button>
            <button class="yes" on:click={deleteItem} disabled={loading} type="button">
                {#if loading}Deleting...
				{:else}Delete{/if}
            </button>
        </div>
    </div>
{/if}

<style>
	.deleteButton {
		background: none;
		border: none;
		cursor: pointer;
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
		background: rgb(235, 210, 210);
		color: #622a2a;
		padding: 5px 30px;
		border: 5px solid #d68585;
		border-radius: 8px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		text-shadow: none;
		font-family: coco-gothic;
		font-weight: lighter;
		box-shadow: inset #d5020295 0px 0px 7px;
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
		color: #d50202;
	}
	.no,
	.yes {
		color: #622a2a;
		background-color: #622a2a34;
		font-family: coco-gothic;
		border-radius: 5px;
		cursor: pointer;
		padding: 0px 10px;
		padding-bottom: 0px;
		font-size: 2.1rem;
		font-weight: normal;
		transition: 0.3s ease-in-out all;
		/* border: 2px solid transparent; */
		box-shadow: inset #622a2a85 0px 0px 7px;
		border: none;
	}

	.yes:hover {
		color: #ebe1d2;
		background-color: #750505;
	}
	.no {
		color: #3f622a;
		background-color: #42622a34;
		margin-right: 20px;
	}
	.no:hover {
		background-color: rgb(70, 128, 0);
		color: #ebe1d2;
		box-shadow: inset #3e622a85 0px 0px 7px;
	}
</style>
