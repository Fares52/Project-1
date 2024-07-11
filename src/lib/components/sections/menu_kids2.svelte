<section>
	<div class="imgContainer">
		<enhanced:img
			class="imgPc"
			src="$lib/images/menu/kid/glued/kidsMenuPcFramed4.webp"
			alt="Kids Menu"
		/>
		<!-- <enhanced:img
			class="imgPhone"
			src="$lib/images/menu/kid/glued/kidsMenuPcFramed4.webp"
			alt="Kids Menu"
		/> -->
		<enhanced:img
			class="imgPhone"
			src="$lib/images/menu/kid/glued/kidsMenuPhone.webp"
			alt="Kids Menu"
		/>
	</div>
</section>

<style>
	section {
		width: 100%;
		display: inline-flex;
		max-width: 100%;
		height: fit-content;
		justify-content: center;
		justify-items: center;
		align-items: center;
		padding: 20px 0px;
		/* background-color: #392317; */
		/* background: linear-gradient(to top , #392317, #ebe1d2); */
		/* background-image: url($lib/images/menu/kid/glued/tiles.png);
        background-size: 200px auto; */
		background-color: rgb(249, 248, 244); /* White background */
		background-image: linear-gradient(to bottom, #eceadf 0%, rgb(249, 248, 244) 8%),
			linear-gradient(to right, #eceadf 0%, rgb(249, 248, 244) 8%);
		background-size:
			100% 30px,
			30px 100%; /* Adjust 30px to the desired spacing */
		/* background: linear-gradient(top, #DFE8EC 0%, white 8%) 0 57px; */
		/* background-position: center; */
		z-index: 2;
		position: relative;
	}

	.imgPc {
		width: 100%;
		height: auto;
	}
	.imgPhone {
		display: none;
		width: 100%;
		height: auto;
	}
	.imgContainer {
		max-width: 1000px;
	}
	@media only screen and (max-width: 800px) {
		.imgPhone{
			display: block;
		}
		.imgPc{
			display: none;
		}
		.imgContainer{
			width: 100%;
		}

		section{
			background: none;
			padding: 0px;
		}
	}
</style>
