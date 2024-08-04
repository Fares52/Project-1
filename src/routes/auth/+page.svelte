<script>
	// @ts-nocheck

	import user from '../../user';
	import Login from '$lib/Login.svelte';

	$: isLoggedIn = $user !== null;

	const logout = () => {
		user.update(() => null);
	};
	
</script>

{#if isLoggedIn}
	<h1>{$user.username} LOGGED IN POG</h1>
	<input type="button" value="Logout!" on:click={logout} />
{:else}
	<Login />
{/if}
