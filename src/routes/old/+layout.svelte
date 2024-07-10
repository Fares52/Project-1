<script>
	import { onMount, onDestroy } from 'svelte';

	let isHovered = false;
	let isScrolled = false;

	const handleScroll = () => {
		if (typeof window !== 'undefined') {
			isScrolled = window.scrollY > 0;
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);
			handleScroll(); // Check initial scroll position on mount
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
		}
	});
</script>

<header>
	<nav
		class="{isScrolled || isHovered ? 'hover' : ''}"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
	>
		<ul class="NavLinks">
			<!-- have to know how to import svg correctly, surely there is better way than this -->
			<button type="button" class="burger">
				<svg class="hamburger" width="40" height="40" fill="#502314">
					<path
						d="M5 30h30v-3.333H5V30zm0-8.333h30v-3.334H5v3.334zM5 10v3.333h30V10H5z"
						fill-rule="evenodd"
					></path>
				</svg>
			</button>

			<li><a href="/Menu">Our Menu <span class="hoverSpanAnime"></span> </a></li>
			<li><a href="/Family">Family Corner <span class="hoverSpanAnime"></span> </a></li>
			<li><a href="/Hire">Hire Us! <span class="hoverSpanAnime"></span> </a></li>
			<li><a href="/Care">Burger Kare <span class="hoverSpanAnime"></span> </a></li>
		</ul>

		<a href="/" class="NavLogo">
			<img src="/images/borgar.png" alt="BK_Logo" />
		</a>

		<div class="NavDivRight">
			<a href="/Map" class="mapLink">
				<svg
					class="map"
					width="24"
					height="24"
					fill="#502314"
					viewBox="0 0 24 24"
					preserveAspectRatio="none"
				>
					<path
						d="M11.74 22a.911.911 0 0 1-.675-.3C10.342 20.897 
            4 13.746 4 9.74 4 5.473 7.472 2 11.74 2c4.269 0 7.741 3.472 7.741 7.74 0 4.006-6.342 11.157-7.065 
            11.96a.911.911 0 0 1-.675.3zm0-9.66a3.357 3.357 0 0 0 3.353-3.352 3.356 3.356 0 0 0-3.352-3.352 3.356 
            3.356 0 0 0-3.353 3.352 3.357 3.357 0 0 0 3.353 3.353z"
						fill-rule="evenodd"
						stroke="transparent"
					></path>
				</svg>
				<span class="hoverSpanAnime"></span>
			</a>
			<a href="/Login" class="loginLink">
				<svg width="24" height="24" class="crown" viewBox="0 0 24 24" fill="#502314"
					><path
						class="crown-path"
						d="M3.663 20.616a1.635 1.635 0 01-1.617-1.34L.014 8.377C-.125 7.591.799 7.036 1.4 7.5l4.942 3.74c.415.324 1.062.186 1.293-.276l3.603-6.513c.323-.6 1.2-.6 1.57 0l3.556 6.513c.278.462.878.6 1.294.277L22.6 7.545c.646-.508 1.524.046 1.385.877l-2.078 10.9a1.635 1.635 0 01-1.617 1.34l-16.627-.046z"
						fill-rule="evenodd"
					></path>
				</svg>
				<span class="hoverSpanAnime"></span>
			</a>

			<a href="/order" class="orderLink">
				<svg width="25" height="25" class="bagOnClick" viewBox="0 0 33 32"
					><g
						><path
							fill="#F5EBDC"
							d="M15.984 2.811c1.405-.077 2.317.095 2.78 1.296l2.975.005c-.167-.743-.413-1.45-.774-2.07-1.016-1.748-3.114-2.1-4.98-2.035-2.997.108-4.885 1.802-5.849 4.084l3.155.005c.593-.725 1.451-1.22 2.693-1.287v.002zM29.36 27.868c-.382-5.213-1.13-21.129-1.13-21.129l-16.242-.024H9.45l-5.358-.012-.605 22.215c-.025 1.648-.242 2.793 1.892 2.92 2.156.126 4.999.164 7.975.164 4.321 0 8.92-.081 12.088-.081 4.904 0 4.134-1.129 3.922-4.05l-.005-.003zM15.685 13.143c.19-.418.537-.985.808-1.303.165-.194.481-.178.703-.11.225.07.408.275.465.525a.744.744 0 01-.16.648c-.251.294-.687.691-1.064.987-.334.26-.725.384-.838.303-.282-.208-.067-.705.088-1.048l-.002-.002zm-3.574-2.215c.343-.124.788.009.953.359.18.386.244 1.097.323 1.521.088.48.063.802-.19.865-.21.052-.411-.025-.826-.763-.159-.28-.563-.792-.707-1.097-.17-.361.095-.757.447-.883v-.002zm-1.691 4.274c-.23-.011-.738-.01-1.165-.122-.427-.113-.635-.517-.65-.885-.023-.508.232-.921.745-.702.11.047.986.397 1.422.709.558.397.662.57.56.78-.086.177-.282.251-.91.22h-.002zm11.26 9.647c-.238.745-.804 1.305-1.482 1.658-.46.239-2.296.801-2.736.894-.65.135-1.32.124-1.933-.052-1.822-.52-2.542-1.942-3.556-3.601-.415-.68-1.12-1.405-.765-2.2.223-.494 1.1-.584 1.598-.334.389.195.718.608.998.949.57.514-.235-2.656-.422-3.376-.395-1.517-.946-2.831.124-3.459.879-.515 1.556.273 1.86 1.375.233.836.299 1.15.4 1.685.093-.113.355-.493.865-.486.745.011.885.226 1.24.565a.606.606 0 01.289-.271c.61-.285 1.101-.109 1.494.307.285-.395 1.373.088 1.655.74.754 1.739.971 3.721.37 5.602v.004z"
						></path><path
							fill="transparent"
							d="M15.686 13.143c.19-.418.537-.985.808-1.303.165-.194.481-.178.703-.11.225.07.408.275.465.525a.744.744 0 01-.16.648c-.251.294-.687.691-1.064.987-.334.26-.725.384-.838.303-.282-.208-.067-.705.088-1.048l-.002-.002zM12.112 10.928c.343-.124.788.009.953.359.18.386.244 1.097.323 1.522.088.478.063.801-.19.864-.21.052-.411-.024-.826-.763-.159-.28-.563-.792-.707-1.097-.17-.361.095-.757.447-.883v-.002zM10.42 15.202c-.23-.011-.737-.01-1.164-.122-.427-.113-.635-.517-.65-.885-.023-.508.232-.921.745-.702.11.047.986.397 1.422.709.558.397.662.57.56.78-.086.177-.282.252-.91.22h-.002zM21.68 24.85c-.236.744-.803 1.304-1.48 1.657-.461.239-2.297.801-2.737.894-.65.135-1.32.124-1.933-.052-1.822-.52-2.542-1.942-3.556-3.601-.415-.68-1.12-1.405-.765-2.2.223-.494 1.1-.584 1.598-.334.389.195.718.608.998.949.57.514-.235-2.656-.422-3.376-.395-1.517-.946-2.831.124-3.459.879-.515 1.556.273 1.86 1.375.233.836.299 1.15.4 1.684.093-.112.355-.492.865-.485.745.011.885.226 1.24.565a.605.605 0 01.289-.271c.61-.285 1.101-.109 1.494.307.285-.395 1.373.088 1.655.74.754 1.739.971 3.721.37 5.602v.004z"
						></path></g
					>
				</svg>
				Click & Collect</a
			>
		</div>
	</nav>
</header>

<slot></slot>

<footer>
	<section>
		<h1>Who likes borgars should follow</h1>
		<div class="socials">
			<a href="https://www.facebook.com/burgerkingfranceofficiel/" target="_blank">
				<svg width="24" height="24" fill="white" class="facebook">
					<path
						d="M13.821 22v-9h2.733L17 9h-3.179V7.052c0-1.03.027-2.052 1.466-2.052h1.458V2.14c0-.043-1.253-.14-2.52-.14-2.645 0-4.302 1.657-4.302 4.7V9H7v4h2.923v9h3.898z"
						fill-rule="evenodd"
					></path>
				</svg>
			</a>
			<a href="https://www.instagram.com/burgerkingfr" target="_blank">
				<svg width="24" height="24" fill="white" class="instagram">
					<path
						d="M7.87 2.128c-1.628.073-3.04.471-4.179 1.606C2.548 4.874 2.155 6.29 2.081 7.9c-.045 1.006-.313 8.602.463 10.594a5.04 5.04 0 0 0 2.91 2.903c.633.246 1.356.412 2.416.461 8.86.401 12.145.183 13.53-3.364.246-.631.415-1.353.462-2.41.405-8.883-.066-10.809-1.61-12.351C19.027 2.512 17.586 1.68 7.87 2.128m.081 17.944c-.97-.043-1.496-.205-1.848-.341a3.255 3.255 0 0 1-1.888-1.883c-.591-1.514-.395-8.703-.343-9.866.052-1.14.283-2.18 1.087-2.985.995-.992 2.28-1.479 11.034-1.084 1.142.052 2.186.282 2.992 1.084.995.993 1.489 2.288 1.087 11.008-.044.968-.206 1.493-.343 1.843-.9 2.308-2.972 2.628-11.778 2.224M16.09 6.695c0 .657.535 1.19 1.195 1.19s1.195-.533 1.195-1.19a1.194 1.194 0 0 0-2.39 0m-9.226 5.298a5.103 5.103 0 0 0 5.109 5.097 5.103 5.103 0 0 0 5.11-5.097 5.102 5.102 0 0 0-5.11-5.096 5.102 5.102 0 0 0-5.11 5.096m1.794 0a3.313 3.313 0 0 1 3.316-3.308 3.313 3.313 0 0 1 3.316 3.308 3.313 3.313 0 0 1-3.316 3.31 3.313 3.313 0 0 1-3.316-3.31"
						fill-rule="evenodd"
					></path>
				</svg>
			</a>
			<a href="https://twitter.com/BurgerKingFR" target="_blank">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="white"
					><g
						><path
							d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
						></path></g
					>
				</svg>
			</a>
			<a href="https://www.tiktok.com/@burgerkingfr" target="_blank">
				<svg width="24" height="24" class="tiktok" viewBox="0 0 24 24"
					><path
						d="M18.176 6.277a4.553 4.553 0 01-.394-.229 5.536 5.536 0 01-1.011-.859 4.77 4.77 0 01-1.14-2.351h.004C15.55 2.329 15.585 2 15.59 2h-3.435v13.282c0 .178 0 .354-.007.529 0 .021-.003.041-.004.065 0 .01 0 .02-.002.03v.007a2.917 2.917 0 01-1.467 2.315 2.867 2.867 0 01-1.422.375 2.906 2.906 0 01-2.897-2.917 2.906 2.906 0 012.897-2.917c.303 0 .604.048.893.142l.004-3.498a6.38 6.38 0 00-4.917 1.439 6.74 6.74 0 00-1.47 1.813c-.145.25-.693 1.255-.759 2.885-.041.926.236 1.884.369 2.28v.009c.083.233.406 1.03.932 1.7a6.98 6.98 0 001.488 1.404v-.008l.009.008C7.464 22.073 9.308 22 9.308 22c.32-.013 1.388 0 2.602-.575 1.347-.638 2.114-1.589 2.114-1.589.49-.567.879-1.215 1.151-1.913.311-.817.415-1.797.415-2.189V8.687c.041.025.596.392.596.392s.8.512 2.047.846c.895.238 2.101.288 2.101.288v-3.41c-.422.046-1.28-.088-2.158-.526z"
						fill="white"
						fill-rule="nonzero"
					></path></svg
				>
			</a>
		</div>
	</section>
	<section>
		<div>
			<a href="https://www.burgerking.fr/page/mentions-legales" target="_blank"
				>Legal Mentions - CGU</a
			>
			<a href="https://www.burgerking.fr/page/cgv" target="_blank">CGV</a>
			<a href="https://www.burgerking.fr/page/donnees-personnelles" target="_blank"
				>Personal Data Protection Policies</a
			>
			<a href="https://www.burgerking.fr/page/cookies" target="_blank">Cookies</a>
		</div>
		<div>
			<h2>For your health you should eat more fruits and veggies :D</h2>
		</div>
	</section>
	<p class="version">version 6.9</p>
</footer>

<style>
	/* this is to import fonts */
	@import url('../app.css');

	/* =-=-=-=-==-=-=-=-==-=-=-=-= FOOTER =-=-=-=-==-=-=-=-==-=-=-=-==-=-=-=-= */

	footer {
		background: #2b0200;
		color: rgb(255, 255, 255);
		font-family: RobotoCondensed;
		padding: 20px 6vw;
	}

	footer h1 {
		font-size: 20px;
		font-weight: lighter;
		margin: 5px 0px 5px 0px;
	}

	footer section {
		padding: 20px 6vw;
		border-bottom: 1px solid rgba(102, 102, 102, 0.6);
		box-sizing: border-box;
	}

	.socials {
		margin-top: 15px;
		gap: 20px;
		display: flex;
	}

	section:nth-of-type(2) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: none;
	}

	section:nth-of-type(2) a {
		color: white;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}
	section:nth-of-type(2) a::after {
		content: '|';
		color: rgb(80, 35, 20);
		text-decoration: none;
		margin-left: 5px;
		margin-right: 2px;
	}

	section:nth-child(2) a:last-child::after {
		content: '';
	}

	footer h2 {
		font-size: 16px;
		font-weight: lighter;
		margin-bottom: 0px;
	}

	.version {
		text-align: center;
		color: rgb(102, 102, 102);
		font-size: 12px;
		margin: 0px;
	}

	/* =-=-=-=-==-=-=-=-==-=-=-=-= HEADER =-=-=-=-==-=-=-=-==-=-=-=-==-=-=-=-= */

	header {
		background: linear-gradient(
			-180deg,
			rgba(0, 0, 0, 0.5) 0%,
			rgba(0, 0, 0, 0.35) 51%,
			rgba(0, 0, 0, 0) 100%
		);
		position: fixed;
		top: 0px;
		left: 0px;
		width: 100%;
		z-index: 100;
	}
	nav {
		display: flex;
		width: 100%;
		height: 90px;
		background: transparent;
		color: #fffaea;
		align-items: center;
		justify-content: space-between;
		padding: 0px 9%;
		box-sizing: border-box;
		font-family: 'RobotoCondensed';
		font-weight: 100;
		transition: 200ms ease-in ;
	}

	.NavLinks {
		display: flex;
		align-items: center;
		padding: 0px;
		margin: 0px;
		height: 90%;
	}

	.NavLinks a,
	li {
		text-decoration: none;
		color: inherit;
		list-style: none;
		height: 50px;
		display: flex;
		align-items: center;
	}
	.NavLinks li {
		padding: 0px 7px;
		height: 90%;
	}

	/* this is for the timing, otherwise if we remove it, they insta dissapear */
	li,
	svg {
		transition: 200ms ease-in ;
	}

	nav a {
		position: relative;
		display: flex;
	}
	.burger {
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		height: fit-content;
		margin-right: 30px;
	}

	nav svg {
		fill: #fffaea;
	}

	.NavLogo {
		height: fit-content;
		display: flex;
		position: absolute;
		left: 50%;
		translate: -50% 10%;
	}

	.NavLogo img {
		aspect-ratio: 1/1;
		height: 90px;
		margin: 0px;
		padding: 0px;
	}

	.NavDivRight {
		display: flex;
		gap: 10px;
		align-items: center;
	}
	.NavDivRight a {
		padding: 10px 2px;
		align-items: center;
		justify-content: center;
	}

	.orderLink {
		color: #fffaea;
		text-decoration: none;
		background-color: rgb(214, 35, 0);
		border-radius: 10px;
		padding: 14px 20px !important;
		display: flex;
		align-items: center;
		gap: 5px;
		font-weight: bold;
		font-size: 14px;
	}

	/* --===--===--===--===--=== Hovering animations ===--===--===--===--===-- */

	.hoverSpanAnime {
		scale: 0% 100%;
		bottom: 0px;
		width: 100%;
		position: absolute;
		background-color: #f5a528;
		height: 2px;
		transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		transform-origin: left;
	}

	.hover li:hover .hoverSpanAnime,
	.hover a:hover .hoverSpanAnime {
		scale: 100% 100%;
		width: 100%;
		transition: 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
		transform-origin: left;
	}

	.hover  {
		background: #fffaea;
		transition: 200ms ease-in ;
	}

	.hover svg,
	.hover li {
		fill: #502314;
		color: #502314;
		transition: 200ms ease-in ;
	}

</style>
