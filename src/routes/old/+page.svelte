<script>
	import Magik from './components(old)/magik.svelte'
</script>

<section class="sec1">
	<img src="/images/MainImage.webp" usemap="#image-map" alt="MainImage" />
	<a href="https://www.burgerking.fr/page/bal-de-promos">I Discover! :O</a>
</section>

<section class="sec2">
	<div class="sec2_div1">
		<h1>Boiling hot !</h1>
		<p>Discover what's new in BorgarKing</p>
	</div>

	<div class="sec2_div2">
		<a href="/test"
			><img src="/images/Info.webp" alt="Important Info" />
			<h2>Important Info</h2></a
		>
		<a href="/test2"
			><img src="/images/Toasty.webp" alt="Toasty" />
			<h2>I take a toast!</h2></a
		>
		<a href="/test3"
			><img src="/images/Kitty.webp" alt="Kitty" />
			<h2>Hello kitty..?</h2></a
		>
	</div>
</section>

<section class="sec3">
	<div class="sec3_div">
		<a href="/">Discover the Advantages!</a>
	</div>
</section>

<Magik />
<!-- 
<section class="sec4">
	<h1>Big hungry or small hungry ? 🍔</h1>
	<div class="container">
		<button class="smallCard">
			<div class="info">hi</div>
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<div class="info">this shit</div>
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<div class="info">so annoying</div>
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
		<button class="smallCard">
			<div class="info">ong</div>
			<div class="bigCard">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
		</button>
	</div>
</section> -->

<style>
	/* global selectors first */
	section {
		box-sizing: border-box;
		display: flex;
		/* background-image: url('/images/MainImage.webp');
		background-repeat: no-repeat;
		background-position: center;
		min-height: 500px;
		background-size: cover; */
		position: relative;
		font-family: RobotoCondensed;
	}

	p {
		margin: 0px;
	}
/* ==--====--====--==Section 4==--====--====--== IT BECAME THE magik.svelte COMPONENT IN lib */
	
	/* ==--====--====--==Section 3==--====--====--== */

	.sec3 {
		justify-content: center;
		align-items: center;
	}

	.sec3_div {
		width: 100vw;
		height: 200px;
		background: transparent no-repeat url('/images/section3.webp') center center / cover;
		min-height: 27vw;
	}

	.sec3 a {
		background-color: #f5ebdc;
		padding: 10px 15px;
		position: absolute;
		bottom: 25.9px;
		left: 48.7%;
		translate: -50% 0%;
		border-radius: 10px;
		color: #502314;
		text-decoration: none;
		font-family: 'Poe';
	}

/* ==--====--====--==Section 2==--====--====--== */

	.sec2 {
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #502314;
		margin: 25px 0px;
	}

	.sec2_div1 {
		text-align: center;
		gap: 10px;
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	.sec2_div1 h1 {
		font-family: 'Poe';
		font-size: 38px;
		font-weight: bold;
		margin-bottom: 0px;
	}

	.sec2_div2 {
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		overflow-x: auto;
		/* height: 50vh; */
		position: relative;
		box-sizing: border-box;
		align-items: center;
		gap: 10px;
		max-width: 80%;
		scrollbar-width: thin;
		scrollbar-color: #ffa3001f transparent;
		scrollbar-gutter: stable;
		padding-bottom: 10px;
	}

	.sec2_div2 a {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		width: fit-content;
		justify-content: center;
		font-family: poe;
		font-size: 15px;
	}
	.sec2_div2 img {
		height: 215px;
		border-radius: 10px;
	}

	.sec2_div2 a h2 {
		color: #502314;
	}

/* ==--====--====--==Section 1==--====--====--== */

	.sec1 img {
		max-width: 100%;
		aspect-ratio: auto;
		object-fit: cover;
		object-position: center center;
		display: block;
		height: 100%;
		left: 0;
		position: static;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	.sec1 a {
		background-color: #f25626;
		padding: 10px 15px;
		position: absolute;
		bottom: 27.9px;
		left: 48.7%;
		translate: -50% 0%;
		border-radius: 10px;
		color: white;
		text-decoration: none;
	}


</style>
