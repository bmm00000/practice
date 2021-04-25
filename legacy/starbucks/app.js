const hamburger = document.getElementById('hamburger');
const mobileRightLinks = document.getElementById('mobile-right-links');

hamburger.addEventListener('click', () => {
	mobileRightLinks.classList.toggle('show');
});

//

const aboutUs = document.getElementById('about-us');
const aboutUsLinks = document.getElementById('about-us-links');

aboutUs.addEventListener('click', () => {
	aboutUsLinks.classList.toggle('show');
});

//

const careers = document.getElementById('careers');
const careersLinks = document.getElementById('careers-links');

careers.addEventListener('click', () => {
	careersLinks.classList.toggle('show');
});

//

const socialImpact = document.getElementById('social-impact');
const socialImpactLinks = document.getElementById('social-impact-links');

socialImpact.addEventListener('click', () => {
	socialImpactLinks.classList.toggle('show');
});

//

const business = document.getElementById('business');
const businessLinks = document.getElementById('business-links');

business.addEventListener('click', () => {
	businessLinks.classList.toggle('show');
});

//

const order = document.getElementById('order');
const orderLinks = document.getElementById('order-links');

order.addEventListener('click', () => {
	orderLinks.classList.toggle('show');
});
