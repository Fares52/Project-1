<section id="about">
	<div class="about-container">
		<h2>About</h2>
		<div class="about-section">
			<h3>Accessibility</h3>
			<ul>
				<li>Wheelchair-accessible seating</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Service options</h3>
			<ul>
				<li>Outdoor seating</li>
				<li>Takeaway</li>
				<li>Dine-in</li>
				<li class="strikethrough">Delivery</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Atmosphere</h3>
			<ul>
				<li>Casual</li>
				<li>Cosy</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Amenities</h3>
			<ul>
				<li>Bar on site</li>
				<li>Toilets</li>
				<li>Wi-Fi</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Offerings</h3>
			<ul>
				<li>Alcohol</li>
				<li>Beer</li>
				<li>Cocktails</li>
				<li>Coffee</li>
				<li>Healthy options</li>
				<li>Spirits</li>
				<li>Wine</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Dining options</h3>
			<ul>
				<li>Breakfast</li>
				<li>Lunch</li>
				<li>Dinner</li>
				<li>Catering</li>
				<li>Dessert</li>
				<li>Seating</li>
			</ul>
		</div>
		<div class="about-section">
			<h3>Crowd</h3>
			<ul>
				<li>Family friendly</li>
				<li>Groups</li>
			</ul>
		</div>
	</div>
	<div class="filter"></div>
</section>

<style>
	section {
		background: url('$lib/images/backgrounds/bg3.jpg') no-repeat center center;
		background-size: cover;
		margin: 0;
		padding: 0;
		color: white;
		position: relative;
		text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.501);
	}
	.filter {
		background: #91713c78;
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.about-container {
		position: relative;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 20px;
		padding: 50px;
		max-width: 1000px;
		margin: 0px auto;
		z-index: 3;
	}
	.about-section {
		padding: 20px;
		/* background: rgba(0, 0, 0, 0.7); */
		border-radius: 10px;
		/* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
		font-family: RobotoCondensed;
	}
	h2 {
		grid-column: 1 / -1;
		text-align: center;
		font-size: 2.5em;
        font-size: 5rem;
		font-family: catchymager;
	}
	h3 {
		margin-top: 0;
        margin-bottom: 7px;
		font-size: 1.5em;
        font-weight: bolder;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li::before {
		content: '✓';
		color: #ffffff;
		margin-right: 8px;
	}
	li {
		margin-bottom: 4px;
	}
	li.strikethrough::before {
		content: '✗';
	}
</style>
