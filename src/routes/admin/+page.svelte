<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import user from '../../user';
	import Login from '$lib/Login.svelte';
	import { fade } from 'svelte/transition';
	import DataTable2 from '$lib/components/admin/dataTable2.svelte';

	export let data = []; // This should be populated by the load function

	$: isLoggedIn = $user !== null;

	const logout = () => {
		user.update(() => null);
	};

	// Function to fetch updated data from the API
	async function fetchData() {
		console.log('Fetching new data...');
		try {
			const response = await fetch('/api/food');

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = await response.json();
			data = result.items;
			console.log('Updated data:', data);
		} catch (error) {
			console.error('Failed to refresh data:', error);
		}
	}

	onMount(() => {
		// Initial data fetch on page load
		fetchData();
	});
</script>

<!--
  @component
  ## Some bugs that need fixing:
  `MAJOR ERROR :` npm Server seemingly just kills itself after some time when the user is logged in. 
 
-->

<section>
	<!-- <div class="filter"></div> -->
	{#if isLoggedIn}
		<div class="container" in:fade={{ duration: 500 }} out:fade={{ duration: 500 }}>
			<nav>
				<div class="title">
					<h1>La Parenthè<span>(</span>ze<span>)</span></h1>
					<h2><span>ADMIN</span></h2>
				</div>
				<button class="logoutButton" type="button" value="Logout!" on:click={logout}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="#000000"
						viewBox="0 0 256 256"
						style="--darkreader-inline-fill: #060606;"
						data-darkreader-inline-fill=""
					>
						<path
							d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"
						>
						</path>
					</svg>
					Logout
				</button>
			</nav>
			<DataTable2 {data} on:refresh={fetchData} />
		</div>
	{:else}
		<Login />
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-image: radial-gradient(#623e2a4e, #623e2ae9), url('$lib/images/backgrounds/bg1.png');
		background-repeat: no-repeat;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		/* background-attachment: fixed; */
		position: relative;
		color: white;
		justify-content: center;
		align-items: center;
		text-align: center;
		text-shadow: rgba(0, 0, 0, 0.375) 0px 0.6px 3.5px;
	}

	* {
		z-index: 2;
		box-sizing: content-box;
	}

	.container {
		width: 100%;
		min-height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		/* background-color: #f4f1ed; */
	}

	nav {
		background-color: #623e2a;
		border-bottom: #d5b602 solid 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 7px;
		position: relative;
		top: 0px;
	}
	nav h1 {
		font-family: ITCAvantGardeStd;
		font-size: 2.2rem;
		letter-spacing: 1px;
		font-weight: lighter;
	}

	nav h1 span {
		color: #d5b602;
	}

	nav h2 {
		color: #d5b602;
		font-family: catchymager;
		font-size: 1.9rem;
		font-weight: light;
	}

	nav h2 span {
		color: #d5b602;
		font-weight: lighter;
	}

	.logoutButton {
		background-color: transparent;
		border: none;
		position: absolute;
		right: 0px;
		margin-right: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		scale: 0.8;
		color: #f4f1ed;
		cursor: pointer;
		padding: 5px;
		transition: 0.1s linear;
	}
	.logoutButton svg {
		fill: #f4f1ed;
	}
	.logoutButton:hover {
		opacity: 0.7;
		transition: 0.1s linear;
	}

	@media only screen and (max-width: 560px) {
		.logoutButton {
			margin-right: 15px;
			flex-direction: column;
		}
	}
</style>
