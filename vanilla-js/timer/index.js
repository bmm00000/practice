// EVENT - BASED ARCHITECTURE: look at the screenshots. The reason we separate the code for the timer and the code for the border is that we can reuse the code for the timer in any other situation when we don't have border in our timer but some other effect that we want to trigger. Also, we can reuse the code for the border in other projects that have no timer involved, for example, a progress circle when we are downloading a file, etc.

// in order to do this, we are going to implement a class for the timer (we could do it in many different ways, but a class is very suitable here)

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		duration = totalDuration;
	},

	onTick(timeRemaining) {
		circle.setAttribute('stroke-dashoffset', perimeter * timeRemaining / duration - perimeter);
	},

	onComplete() {
		console.log('Timer completed');
	}
});
// when we instantiate the class, the callbacks we send to the constructor are optional, and they are the ones that will manage the border).

// SVG elements (scalable vector graphics): html elements that we use to draw arbitrary shapes on the screen (look at the screenshot): the SVG element is like a canvas, so we can draw shapes inside of it. 'cy' and 'cx' determine where the center of the circle is.
