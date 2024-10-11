<!-- this video is where i learned this -->
<!-- https://www.youtube.com/watch?v=aFxcq0XTmRg -->

<script>
	// @ts-nocheck

	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import user from '../user.js';

	let username = '';
	let password = '';
	let currentError = null;
	let showForm = true; // Control visibility of the form

	onMount(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});

	// Watch for changes in username and password and clear the error message
	$: if (username || password) {
		currentError = null;
	}

	const login = async () => {
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password })
			});

			if (res.ok) {
				const { token } = await res.json();
				localStorage.setItem('auth_token', token);
				user.set({ username });
				showForm = false; // Hide form after successful login
			} else {
				const { error } = await res.json();
				currentError = error || 'Invalid username or password';
			}
		} catch (error) {
			currentError = 'Error logging in';
			console.log(error);
		}
	};

</script>

<!-- @component 
  # some bugs that need fixing:
  `1: ` for some reason, the server times out on its own and self destructs after a certain time when the user logs in
 -->

<!-- Apply transitions to the title and form -->
<div class="transition">
	<div class="title">
		<h1>La Parenthè<span>(</span>ze<span>)</span></h1>
		<h2>&gt; <span>ADMIN</span> &lt;</h2>
	</div>

	<form on:submit|preventDefault={login}>
		<div class="labelDiv">
			<label>
				Username
				<input type="text" name="username" id="username" bind:value={username} />
			</label>
			<label>
				Password
				<input type="password" name="password" id="password" bind:value={password} />
			</label>
		</div>
		{#if currentError}
			<p class="error">{currentError}</p>
		{/if}
		<input type="submit" value="Log In" />
	</form>
</div>

<style>
	.transition {
		display: flex;
		flex-direction: column;
		height: calc(var(--vh) - 50px); /* Example offset for headers/footers */
		justify-content: center;
		align-items: center;
	}
	.title,
	form {
		z-index: 2;
	}

	h1 {
		font-family: ITCAvantGardeStd;
		font-size: 10rem;
		font-weight: lighter;
	}

	h1 span {
		color: #d5b602;
	}

	h2 {
		color: white;
		font-family: catchymager;
		font-size: 5.5rem;
		font-weight: light;
	}

	h2 span {
		color: #d5b602;
		font-size: 4rem;
	}

	/* FORMULAIR CSS FORMULAIR CSS FORMULAIR CSS FORMULAIR CSS FORMULAIR CSS */

	form {
		display: flex;
		flex-direction: column;
		margin-top: 50px;
		background-color: #ebe1d2;
		padding: 20px;
		border: #d6b785 6px solid;
		border-radius: 5px;
		width: 500px;
		height: 40%;
		justify-content: space-between;
		text-shadow: none;
		min-height: 300px;
	}

	.labelDiv {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	label {
		display: inline-flex;
		flex-direction: column;
		align-items: start;
		font-size: 2rem;
		font-family: RobotoCondensed;
		color: #623e2a;
		width: 100%;
		gap: 5px;
	}

	input {
		width: 100%;
		opacity: 0.44;
		color: #623e2a;
		background-color: white;
		font-size: 1.8rem;
		padding: 5px;
		border-radius: 5px;
		border: 2px transparent solid;
		transition: 0.2s all linear;
	}

	input:focus {
		outline: none;
		border: #623e2a 2px solid;
		transition: 0.2s all linear;
	}

	input[type='submit'] {
		width: 50%;
		margin: auto;
		margin-bottom: 20px;
		opacity: 1;
		border: none;
		background-color: #d6b785;
		color: #623e2a;
		font-size: 1.8rem;
		padding: 5px;
		border-radius: 5px;
		transition: 0.2s all linear;
	}

	input[type='submit']:hover {
		opacity: 1;
		box-shadow: 0 0 50px 5px #623e2a inset;
		color: #d6b785;
		cursor: pointer;
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #623e2a inset;
		box-shadow: 0 0 5px 5px #623e2a30 inset;
		-webkit-text-fill-color: #000;
	}

	.error {
		color: rgba(255, 0, 0, 0.53);
		margin: auto;
	}

	@media only screen and (max-width: 800px) {
		h1 {
			font-size: 7.5rem;
		}

		h2 {
			font-size: 4.5rem;
		}
		h2 span {
			font-size: 3.5rem;
		}

		form {
			max-height: 310px;
		}
	}

	@media only screen and (max-width: 600px) {
		h1 {
			font-size: 6.5rem;
		}
		form {
			width: 400px;
			max-height: 300px;
			min-height: 300px;
		}
	}

	@media only screen and (max-width: 500px) {
		h1 {
			font-size: 5.5rem;
		}
	}

	@media only screen and (max-width: 450px) {
		h1 {
			font-size: 4.5rem;
		}
		h2 {
			font-size: 3.5rem;
		}
		h2 span {
			font-size: 2.5rem;
		}
		form {
			width: 300px;
		}
	}
</style>
