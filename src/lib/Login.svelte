<!-- this video is where i learned this -->
<!-- https://www.youtube.com/watch?v=aFxcq0XTmRg -->
<script>
// @ts-nocheck

    import user from '../user.js';
    let username = '';
    let password = '';
    let currentError = null;
  
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
<section>
	<div class="filter"></div>
	<div class="title">
		<h1>La Parenthè<span>(</span>ze<span>)</span></h1>
		<h2>&gt; <span>ADMIN</span> &lt;</h2>
	</div>

	<form on:submit|preventDefault={login}>
        <div class="labelDiv">
		<label>
			Username
			<input type="text" bind:value={username} />
		</label>
		<label>
			Password
			<input type="password" bind:value={password} />
		</label>
    </div>
		{#if currentError}
			<p>{currentError}</p>
		{/if}
		<button type="submit">Log In</button>
	</form>
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
	.filter {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		background-color: #623e2a;
		opacity: 0.48;
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

	button[type='submit'] {
		width: 50%;
		margin: auto;
		margin-bottom: 20px;
		opacity: 1;
		border: none;
		background-color: #d6b785;
	}
	button[type='submit']:hover {
		opacity: 1;
		box-shadow: 0 0 50px 5px #623e2a inset;
		color: #d6b785;
		cursor: pointer;
	}

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0px 1000px #623e2a inset;
		box-shadow: 0 0 5px 5px #623e2a30 inset;
		-webkit-text-fill-color: #000; /* Optional: you can also set the text color */
	}

	/* .error {
		color: rgba(255, 0, 0, 0.53);
	} */
</style>
