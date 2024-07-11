<section>
	<h1>Entrées | 5€</h1>
	<div class="cardContainer">
		<div class="card">
			<enhanced:img class="foodPic" src="$lib/images/menu/food/soup.jpg" alt="FoodPhotoGoesHere" />
			<div class="cardInfo" role="button" tabindex="0">
				<p>New</p>
				<h2>Velouté de courge/sucrine au lait de coco</h2>
				<p>5 Euro</p>
				<svg
					class="arrowSVG"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#623e2a"
					viewBox="0 0 256 256"
					style="--darkreader-inline-fill: #060606;"
					data-darkreader-inline-fill=""
					><path
						d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
					></path></svg
				>
				<p class="discription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. At, autem quasi itaque, facilis
					modi sapiente minus natus inventore, possimus illum ullam. Repellat amet, at nihil
					deserunt animi sint eaque obcaecati.
				</p>
			</div>
		</div>
		<div class="card">
			<enhanced:img
				class="foodPic"
				src="$lib/images/menu/food/Maquereau.jpg"
				alt="FoodPhotoGoesHere"
			/>
			<div class="cardInfo" role="button" tabindex="0">
				<p>Signature Dish</p>
				<h2>Maquereau Gravlax à l'aneth</h2>
				<p>5 Euro</p>
				<svg
					class="arrowSVG"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#623e2a"
					viewBox="0 0 256 256"
					style="--darkreader-inline-fill: #060606;"
					data-darkreader-inline-fill=""
					><path
						d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
					></path></svg
				>
				<p class="discription">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum expedita perferendis
					minima, ducimus sapiente dolore eaque necessitatibus. Nemo voluptatibus mollitia
					perspiciatis obcaecati consequuntur, labore fuga odit, veritatis, consectetur eius et!
				</p>
			</div>
		</div>
		<div class="card">
			<enhanced:img class="foodPic" src="$lib/images/menu/food/foie.jpg" alt="FoodPhotoGoesHere" />
			<div class="cardInfo" role="button" tabindex="0">
				<p>Best seller</p>
				<h2>Nos dégustations de foie gras maison</h2>
				<p>5 Euro</p>
				<svg
					class="arrowSVG"
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					fill="#623e2a"
					viewBox="0 0 256 256"
					style="--darkreader-inline-fill: #060606;"
					data-darkreader-inline-fill=""
					><path
						d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
					></path></svg
				>
				<p class="discription"></p>
			</div>
		</div>
		<!--         
        <div class="card">
            <enhanced:img class="foodPic" src="$lib/images/menu/food/foie.jpg" alt="FoodPhotoGoesHere" />
            <div class="cardInfo">
                <p>New</p>
                <h2>Nos dégustations de foie gras maison</h2>
                <p>5 Euro</p>
            </div>
        </div>
        <div class="card">
            <enhanced:img class="foodPic" src="$lib/images/menu/food/foie.jpg" alt="FoodPhotoGoesHere" />
            <div class="cardInfo">
                <p>New</p>
                <h2>Nos dégustations de foie gras maison</h2>
                <p>5 Euro</p>
            </div>
        </div> -->
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		background-color: #ebe1d2;
		color: #623e2a;
		padding: 20px 0px;
		padding-bottom: 60px;
		justify-content: center;
		align-items: center;
	}

	h1 {
		text-align: center;
		font-family: catchyMager;
		font-weight: lighter;
		font-size: 5rem;
		padding: 30px 0px;
	}
	h2 {
		min-height: 65.6px;
	}

	.cardContainer {
		display: flex;
		width: fit-content;
		max-width: 90%;
		flex-direction: row;
		justify-content: start;
		align-items: start;
		gap: 2vw;
		overflow-x: auto;
		scrollbar-width: thin;
		padding: 0px 20px;
		/* padding-bottom: 1vw; */
		scrollbar-color: #623e2a transparent;
		box-sizing: border-box;
		/* background-color: rgba(98, 62, 42, 0.04) ; */
	}

	.card {
		width: 300px;
		display: flex;
		flex-direction: column;
		/* margin-bottom: 5px; */
		/* color: #ebe1d2;
        background-color: #623e2a; */
	}

	.cardInfo {
		border: 1px #623e2a solid;
		width: 300px;
		padding: 10px;
		margin-top: 10px;
		font-family: RobotoCondensed;
		font-weight: light;
		overflow-wrap: normal;
		position: relative;
		min-height: 130.4px;
		/* background-color: #ebe1d2; */
		/* box-shadow: rgba(0, 0, 0, 0.375) 0px 0.6px 3.5px inset; */
	}

	.foodPic {
		width: 300px;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		object-position: center;
		display: flex;
		/* box-shadow: rgba(0, 0, 0, 0.485) 0px 0.6px 3.5px inset; */
	}

	.discription {
		background-color: #623e2a;
		padding: 0px;
		margin: -10px;
		box-sizing: border-box;
		margin-top: 10px;
		color: #ebe1d2;
		height: 0px;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: start;
		transition: all ease-in-out 0.35s;
		overflow-y: scroll;
		scrollbar-width: thin;
		scrollbar-color: #ebe1d28a transparent;
	}

	.arrowSVG {
		position: absolute;
		right: 10px;
		/* bottom: 10px; */
		translate: 0% -100%;
		transition: all ease-in-out 0.5s;
		transform: scale(1, 1);
	}

	.cardInfo:focus-within .discription {
		display: flex;
		height: 80px;
		transition: all ease-in-out 0.35s;
		padding: 10px;
	}

	.cardInfo:focus-within .arrowSVG {
		/* rotate: -180deg; */
		transform: scale(1, -1);
		transition: all ease-in-out 0.5s;
	}

	.card:has(.discription:empty) :where(.discription, .arrowSVG) {
		display: none;
	}

	.card:has(.discription:not(:empty)) .cardInfo {
		cursor: pointer;
	}

	@media only screen and (max-width: 940px) {
		h1 {
			/* padding: 40px 0px; */
		}
		.card {
			scale: 0.95;
		}
		.cardContainer {
			padding: 0px 0px;
			gap: 0px;
		}
	}

	@media only screen and (max-width: 740px) {
		h1 {
			padding: 20px 0px;
			font-size: 4.5rem;
		}
		.card {
			scale: 0.95;
		}
		.cardContainer {
			scale: 0.95;
		}
	}

	@media only screen and (max-width: 630px) {
		h1 {
			padding-top: 15px;
			padding-bottom: 5px;
			font-size: 4.2rem;
		}
		.card {
			scale: 0.95;
		}
		.cardContainer {
			scale: 0.9;
		}
		section{
			padding-bottom: 35px;
		}
	}
	@media only screen and (max-width: 530px) {
		h1 {
			padding-top: 5px;
			padding-bottom: 0px;
			font-size: 3.9rem;
		}
		.card {
			scale: 0.95;
		}
		.cardContainer {
			scale: 0.9;
			scroll-snap-type:x proximity;
		}
	}
</style>
