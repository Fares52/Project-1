<section class="sec1" id="menu">
	<h1>Formule Entrées + Plats + Desserts = 19€</h1>
	<div class="bgColorFilter"></div>
</section>
<h2>Menu d’aujourdhui</h2>

<style>
	* {
		font-family: catchyMager;
		font-size: 5rem;
		text-align: center;
		text-shadow: rgba(0, 0, 0, 0.375) 0px 0.6px 3.5px;
		font-weight: lighter;
	}
	.sec1 {
		display: flex;
		flex-direction: column;
		background-image: url('$lib/images/backgrounds/bg1.1.jpg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-attachment: fixed;
		position: relative;
		color: #ebe1d2;
		justify-content: center;
		align-items: center;
	}
	h1 {
		z-index: 2;
		padding: 50px 0px;
	}
	.bgColorFilter {
		background-color: hsla(21, 40%, 27%, 0.6);
		height: 100%;
		width: 100%;
		z-index: 1;
		position: absolute;
		top: 0px;
		left: 0px;
	}

	h2 {
		background-color: #392317;
		color: #f4f1ed;
		padding: 15px 0px;
	}

	@media only screen and (max-width: 940px) {
		* {
			font-size: 4rem;
		}
		h1 {
			padding: 40px 0px;
		}
	}

	@media only screen and (max-width: 740px) {
		* {
			font-size: 3.5rem;
		}
		h1 {
			padding: 30px 0px;
		}
	}
	@media only screen and (max-width: 630px) {
		* {
			font-size: 3rem;
		}
		h1 {
			padding: 25px 0px;
		}
		h2 {
			padding: 10px 0px;
		}
	}
	@media only screen and (max-width: 530px) {
		* {
			font-size: 2.7rem;
		}
		h1 {
			padding: 25px 0px;
		}
		h2 {
			padding: 10px 0px;
		}
		
	}
</style>
