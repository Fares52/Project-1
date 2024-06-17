<section>
	<h1>Big hungry or small hungry ? 🍔</h1>

	<div id="container" class="container">
		<button class="smallCard">
			<a href="#container" class="info" >hi</a >
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<a href="#container" class="info" >this shit </a >
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<a href="#container" class="info" >so annoying</a >
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<a href="#container" class="info" >ong</a >
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
	</div>
</section>


<style>
	section {
		height: 100vh;
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
		align-items: center;
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
		justify-content: center;
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
		position: relative;
		top: 0%;
		left: 0%;
		width: 200px;
		height: 200px;
		display: block;
		visibility: hidden;
		transition: all ease-in-out 0.35s;
		opacity: 0;
	}

	.smallCard:target .bigCard {
		display: block;
		/* transition: all ease-in-out 1s; */
		width: 300px;
		height: 400px;
		visibility: visible;
		transition: all ease-in-out 0.35s;
		opacity: 1;
	}


</style>
