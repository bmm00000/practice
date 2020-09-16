class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	// we use arrow functions now, so the value of 'this' inside the functions when we call them from the eventListeners is the object, and not the buttons.
	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.tick(); // we don't want to wait for some time before 'setInterval' starts the tick
		this.interval = setInterval(this.tick, 20);
	};

	pause = () => {
		clearInterval(this.interval);
	};

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = this.timeRemaining - 0.02;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}

// // when we use 'call', or 'apply' we specify the value of 'this' that we want, as follows:
// const printThis = function() {
// 	console.log(this);
// };
// // 'this' would be the window, but we can change it:

// printThis.call({ color: 'red' });

// 'bind' is similar, only that we specify the 'this' that we want not when we call the function, but we we define it, so we can call it at any point in the future (look at the screenshot).

// we could use 'bind' in the callbacks of the eventListeners, but we use arrow functions instead because these are more modern.

// where is the ultimate source of truth of the time remaining? look at the screenshots: the first option is in the instance of our class (STORING OUR DATA IN THE JAVASCRIPT CODE) (look at the code in the screenshots); the second option is in the input element (STORING OUR DATA INSIDE OF OUR DOM). option 1 is more popular these days, but we are going to use option 2 becuase of UI reasons (the user is going to input the time remaining in the dom element), and also for just to realize about the drawbacks of option 2, so we can see why today option 1 is more popular.
