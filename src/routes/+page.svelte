<script>
	import Entree from '$lib/components/entree/entree.svelte';
	import Plats from '$lib/components/plats/plats.svelte';
	import Desserts from '$lib/components/dessert/dessert.svelte';
    import Section_intro from '$lib/components/sections/section_intro.svelte';
	import MenuIntro from '$lib/components/sections/menu_intro.svelte';
	import MenuKids2 from '$lib/components/sections/menu_kids2.svelte';
	import About from '$lib/components/sections/about.svelte';
	import Maps from '$lib/components/sections/maps.svelte';
	import Footer from '$lib/components/sections/footer.svelte';
</script>

<section>
	<div class="filter"></div>
	<!-- <enhanced:img class='bg1' src="$lib/images/backgrounds/bg1.png" alt="backgroundImage" /> -->
	<div class="title">
		<p>WELCOME TO</p>
		<h1>La Parenthè<span>(</span>ze<span>)</span></h1>
		<h2>Resto <span>&</span> Apéro</h2>
	</div>
	<div class="nav">
		<a href="#menu">MENU</a>
		<a href="#about">ABOUT</a>
	</div>
</section>

<Section_intro />
<MenuIntro />
<Entree />
<Plats />
<Desserts />
<MenuKids2 />
<About />
<Maps />
<Footer />

<style>
	section {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-image: url('$lib/images/backgrounds/bg1.png');
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
	.nav {
		z-index: 2;
	}

	p {
		font-family: coco-gothic;
		letter-spacing: 5px;
		font-weight: bolder;
		font-size: 1.7rem;
		margin-bottom: 15px;
	}

	h1 {
		font-family: ITCAvantGardeStd;
		font-size: 14rem;
		font-weight: lighter;
	}

	h1 span {
		color: #d5b602;
	}

	h2 {
		color: #d5b602;
		font-family: catchymager;
		font-size: 4rem;
		font-weight: light;
	}

	h2 span {
		color: white;
	}
	.nav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50%;
		gap: 6vw;
        position: absolute;
		/* margin-bottom: 5vh; */
		bottom: 6.9vh;
		/* margin-top: 20%; */
	}

	.nav a {
		color: #623e2a;
		background-color: white;
		padding: 10px 80px;
		font-family: coco-gothic;
        font-size: 1.2rem;
        letter-spacing: 3px;
		text-shadow: none;
		font-weight: bolder;
	}

	@media only screen and (max-width: 1212px) {
		section {
			height: 100vh;
		}
		p {
			font-size: 1.5rem;
		}
		h1{
			font-size: 10rem;
		}
		h2{
			font-size: 3.5rem;
		}
		.nav{
			scale: 0.8;
		}
	}

	@media only screen and (max-width: 812px) {
		section {
			height: 100vh;
		}
		p {
			font-size: 1.3rem;
		}
		h1{
			font-size: 8rem;
		}
		h2{
			font-size: 2.5rem;
		}
		.nav{
			scale: 0.8;
		}
	}

	@media only screen and (max-width: 662px) {
		section {
			height: 100vh;
		}
		p {
			font-size: 1.1rem;
		}
		h1{
			font-size: 7rem;
		}
		h2{
			font-size: 2.5rem;
		}
		.nav{
			scale: 0.8;
		}
	}
	@media only screen and (max-width: 596px) {
		section {
			height: 100vh;
		}
		p {
			font-size: 1.1rem;
		}
		h1{
			font-size: 5.2rem;
		}
		h2{
			font-size: 2.5rem;
		}
		.nav{
			scale: 0.75;
		}
	}
	@media only screen and (max-width: 400px) {
		section {
			height: 100vh;
		}
		p {
			font-size: 1rem;
		}
		h1{
			font-size: 4rem;
		}
		h2{
			font-size: 2.3rem;
		}
		.nav{
			scale: 0.75;
		}
	}
	
	
</style>
