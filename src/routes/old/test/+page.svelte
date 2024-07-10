<script>
    export let data;
    let selectedIds = new Set();

    function handleCheckboxChange(event, id) {
        if (event.target.checked) {
            selectedIds.add(id);
        } else {
            selectedIds.delete(id);
        }
    }

    async function handleDelete() {
        if (selectedIds.size === 0) return;

        const confirmed = confirm('Are you sure you want to delete the selected items?');
        if (!confirmed) return;

        const formData = new FormData();
        selectedIds.forEach(id => formData.append('ids', id));

        await fetch('/test', {
            method: 'POST',
            body: formData
        });

        window.location.reload(); // Reload to see changes
    }
</script>

<section>
    <h1>Big hungry or small hungry? 🍔</h1>
    
    <div class="container">
        <button class="smallCard">
            <div class="info">hi</div>
            <div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
        </button>
    </div>

    <form method="post" action="?/create">
        <input type="text" name="info" placeholder="Food Info" required>
        <input type="text" name="text" placeholder="Food Text" required>
        <button type="submit">Add Food</button>
    </form>
    
    <h1>Read!</h1>
    <div class="read-wrapper">
        <div class="read-content">
            {#if data?.foods}
                <button type="submit"on:click={handleDelete} > Delete Selected </button>
                {#each data?.foods as food}
                    <div>
                        <input type="checkbox" on:change={(event) => handleCheckboxChange(event, food.id)}>
                        <span>id   {`${food.id} Info: ${food.info} ,${food.text}`}</span>
                    </div>
                {/each}
            {:else}
                <h1>Error getting food</h1>
            {/if}
        </div>
    </div>
</section>

<style>
	section {
		padding-bottom: 50px;
		padding-top: 200px;
		background-color: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 30px;
		/* margin: 30px 0px; */
		color: beige;
		position: relative;
	}

	.container {
		display: flex;
		position: relative;
		flex-direction: row;
		gap: 20px;
		justify-content: center;
		align-items: start;
		height: auto;
		transition: all ease-in-out 1s;
	}

	.smallCard {
		min-width: 200px;
		min-height: 200px;
		background-color: rgb(36, 159, 104);
		/* border-radius: 10px; */
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		opacity: 1;
		transition: all ease-in-out 0.35s;
		border-radius: 10px;
		padding: 10px;
		border: none;
		/* clip-path: polygon(0 0, 52% 0, 100% 0, 100% 100%, 0 100%); */
		perspective-origin: 200% 100%;
		perspective: 50px;
		position: relative;
	}

	.bigCard {
		position: absolute;
		top: 0;
		left: 0;
		width: 200px;
		height: 200px;
		visibility: hidden;
		transition: all ease-in-out 0.35s;
		opacity: 0;
		background-color: brown;
		border-radius: 10px;
		padding: 10px;
	}

	.info {
		position: relative;
		padding: 10px;
	}

	.smallCard:focus .bigCard {
		display: block;
		/* transition: all ease-in-out 1s; */
		width: 300px;
		height: 400px;
		visibility: visible;
		transition: all ease-in-out 0.35s;
		opacity: 1;
	}
	.smallCard:focus {
		min-width: 300px;
		min-height: 400px;
		transition: all ease-in-out 0.35s;
	}
</style>
