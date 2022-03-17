import { useState, useRef } from 'react';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');

	const nameInputRef = useRef();

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};
	// this is how js in the browser behaves: once we bind this function to the onChange event in the input, we authomatically get an event object (describing the event) as an argument. again, this is vanilla JS.

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		// again, this is vanilla JS and browser behaviour: the default behaviour by the browser is that, when a form is submitted by clicking the button in the form, an http request is sent to the server that is serving this website. but here we don't have a server that wants to do anythings with that request, we just have a static server that serves our js and html files, so we don't want this request to be sent. we want to do that becuase if the http request was sent, then the page would be reloaded in the end, and we don't want that, since it would re-start the whole react app, we would lose all our state, etc.

		console.log(enteredName);
		console.log(nameInputRef.current.value);
		// refs are objects with a 'current' property, which holds the element you assigned to the ref. Since we are assigning an 'input' element, we can access its 'value', because input elements in js (the js objects representing the html input elements) always have a 'value' property which holds the value currently entered in that input.

		setEnteredName('');
		// if you want to reset the input with ref, you could do the following and it would work:
		// nameInputRef.current.value = ''
		// however, this is not an ideal way to do it, because we are directly manipulating the dom (we are using some vanilla js to reach out to the dom and change it), and this is something that typically you shouldn't do, you should leave that up to react, react should be the only thing manipulating the dom.
	};

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='form-control'>
				<label htmlFor='name'>Your Name</label>
				<input
					ref={nameInputRef}
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					value={enteredName}
				/>
			</div>
			<div className='form-actions'>
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

// there are two approaches for fetching the entered value (user input): listen to every keystroke and store the value in some state variable, or to use a ref to fetch the input once the user is done with typing in a value. here we have both, but we typically only use one. which one? it depends on what you plan to do with the entered value. if you are interested on it only once (when the form is submitted), then a ref might be better (updating state on every keystroke is a bit overkill in this situation). but if you need the value with every keystroke, for example for instant validation, then the other approach using the state will be better. another situation when the state approach is better is when you want to reset the input, for example after submission (see above).
