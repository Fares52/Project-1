<section>
	<div class="textDiv">
		<h1>
			Welcome to <br />
			La Parenthèze
		</h1>

		<div class="imgDivHeader">
			<enhanced:img class="bg2" src="$lib/images/backgrounds/bg2.jpg" alt="background2" />
		</div>
		<p>
			At La Parenthèze, we invite you to take a delightful pause from your day and indulge in an
			unforgettable culinary experience. Our menu, inspired by the rich flavors of French cuisine,
			is crafted with fresh, locally-sourced ingredients, ensuring each dish is a true gastronomic
			delight. Whether you're here for a leisurely lunch, a romantic dinner, or a special
			celebration, our warm and inviting ambiance, coupled with our attentive service, will make
			your visit truly memorable. Come and discover La Parenthèze – your perfect escape for a taste
			of authentic French hospitality.
		</p>
	</div>
	<div class="imgDiv">
		<enhanced:img class="bg2" src="$lib/images/backgrounds/bg2.jpg" alt="background2" />
	</div>
</section>

<style>
	section {
		position: relative;
		height: fit-content;
		padding: 50px;
		display: flex;
		flex-direction: row;
		/* gap: 50px; */
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		background-color: #f4f1ed;
		color: #623e2a;
	}

	.textDiv {
		/* height: 100%; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 20px;
		padding: 30px;
		max-width: 1000px;
		/* align-items: center; */
		position: relative;
	}

	h1 {
		font-family: catchymager;
		font-size: 5rem;
		position: relative;
	}

	p {
		font-family: coco-gothic;
		font-size: 2rem;
		text-align: justify;
		line-height: 35px;
		padding-right: 25px;
	}

	.bg2 {
		height: 100%;
		aspect-ratio: 1 / 1;
		width: 100%;
		/* margin: auto; */
		/* max-height: 600px; */
	}

	.imgDiv {
		display: inline-flex;
		height: 500px;
		width: auto;
		aspect-ratio: 1 / 1;
	}
	.imgDivHeader {
		display: none;
	}

	@media only screen and (max-width: 1200px) {
		.imgDiv {
			height: 400px;
		}
	}

	@media only screen and (max-width: 1000px) {
		section {
			padding: 30px;
		}

		.textDiv {
			z-index: 2;
			color: #ffffff;
			text-shadow: #ffffff71 0px 0px 8px;
			padding: 30px;
			gap: 5px;
			background-color: #623e2ab8;
			border-radius: 5px;
			box-shadow: inset #623e2a6b 0px 0px 70px;

		}

		:where(p, h1) {
		}
		h1 {
			z-index: 1;
			text-align: center;
			color: #f4f1ed;
			/* -webkit-text-stroke: #ffffff 1px ; */
			font-weight: bolder;
			font-size: 4rem;
		}
		p {
			padding: 15px;
		}
		.imgDiv {
			position: absolute;
			margin: 80px;
			z-index: 1;
			height: calc(100% - 120px);
			width: calc(100% - 120px);
			object-fit: cover;
			opacity: 0.5;
			/* top: 0px;
			left: 0px; */
			display: none;
		}

		.imgDivHeader {
			display: flex;
			position: absolute;
			z-index: -1;
			height: 100%;
			width: 100%;
			top: 0px;
			left: 0px;
			opacity: 0.6;
			border-radius: 5px;
		}
		
		.bg2 {
			object-fit: cover;
			border-radius: 5px;
			/* box-shadow: inset #623e2ad4 0px 0px 7px; */
			
			/* border: 10px #fcf1e2 solid; */
		}
	}

	@media only screen and (max-width: 440px) {

		section{
			padding: 15px;
		}
		.textDiv{
			padding: 15px;
		}
		p {
			padding: 10px;
			font-size: 1.7rem;
			line-height: 25px;
		}
		h1{
			padding: 0px;
		}
	}

	
</style>
