import { useState } from 'react';
// import {useRef} from 'react'
// import {useEffect} from 'react'

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');
	// const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); we can simplify our code and eliminate this state with the enteredNameIsValid variable, below.
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
	// we might set enteredNameIsValid to true at the begining to avoid the error message when the app loads for the first time, but this has a downside: imagine we have a useEffect as follows (the http request will be sent at the beginning with invalid data (empty data), when the app gets loaded for the first time):
	// useEffect(() => {
	// 	if (enteredNameIsValid) {
	// 		// eg. send http request with enteredName...
	// 	}
	// }, [enteredNameIsValid]);
	// this is happenning because we initialized enteredNameIsValid to true, and that's not correct (we did that as a hacky workaround to avoid the error feedback when the app is loaded for the first time). Even if you don't have the useEffect, initializing enteredNameIsValid to true would not be a good practice. that's why we initialize it as false, and add another state: enteredNameTouched (we are controlling whether or not the user already added something in the name field, ie. whether the user had a chance to enter the name, ie. whether the user touched the input yet: if the user didn't touch the input, there's no reason to show the error).
	// const [formIsValid, setFormIsValid] = useState(false);
	// in our case, we only have one input, therefore, if that input is valid, our form is valid. but if we have many inputs, then as soon as one input is invalid, the whole form is invalid (all inputs have to be valid for the form to be valid). in addition to the validity of the individual inputs, we are going to manage the validity of the whole form with the formIsValid state, and useEffect. but we don't even need this state, we can refactor and eliminate this state and the useEffect below.

	// const nameInputRef = useRef();

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const enteredEmailIsValid = enteredEmail.includes('@');
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);

		// our goal here is to make the warning disappear as soon as we do a new keystroke:
		// if (event.target.value.trim() !== '') {
		// 	setEnteredNameIsValid(true);
		// 	// we use event.target.value above, not enteredName, because state updates are scheduled, so maybe it will not happen as instantly as we need, so we end up not having the updated enteredName if we try to use is in line 20 (you can change it and try it, and see how the browser behaves)
		// }
	};
	// this is how js in the browser behaves: once we bind this function to the onChange event in the input, we authomatically get an event object (describing the event) as an argument. again, this is vanilla JS.

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);

		// if (enteredName.trim() === '') {
		// 	setEnteredNameIsValid(false);
		// }
	};
	// we are doing this, because maybe it happens that the user inputs something, but then deletes it, and then blurs (or maybe the user blurs without giving any input), we want to give feedback also in this situation, even before the form gets submitted.

	const emailInputBlurHandler = (event) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		// again, this is vanilla JS and browser behaviour: the default behaviour by the browser is that, when a form is submitted by clicking the button in the form, an http request is sent to the server that is serving this website. but here we don't have a server that wants to do anything with that request, we just have a static server that serves our js and html files, so we don't want this request to be sent. we want to do that becuase if the http request was sent, then the page would be reloaded in the end, and we don't want that, since it would re-start the whole react app, we would lose all our state, etc.

		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);

		// if (enteredName.trim() === '') {
		// 	setEnteredNameIsValid(false);
		// 	return;
		// }
		// we are making sure that we cannot send a request with empty data to the server. the exact logic that we use will depend on the input value that we are expecting (for just a name we have enough now, but for an email we might want to validate that it's an email with '@'...). but we don't have feedback for the user yet, how to do that? we will do it with state (enteredNameIsValid). however, this approach has downsides (see above)

		if (!enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}
		// we can do this, because the formSubmissionHandler function will be recreated every time that the component is re-evaluated, so it will have access to the updated value of enteredNameIsValid.

		// setEnteredNameIsValid(true);

		// console.log(enteredName);
		// console.log(nameInputRef.current.value);
		// refs are objects with a 'current' property, which holds the element you assigned to the ref. Since we are assigning an 'input' element, we can access its 'value', because input elements in js (the js objects representing the html input elements) always have a 'value' property which holds the value currently entered in that input.

		setEnteredName('');
		setEnteredEmail('');
		// if you want to reset the input with ref, you could do the following and it would work:
		// nameInputRef.current.value = ''
		// however, this is not an ideal way to do it, because we are directly manipulating the dom (we are using some vanilla js to reach out to the dom and change it), and this is something that typically you shouldn't do, you should leave that up to react, react should be the only thing manipulating the dom.
		setEnteredNameTouched(false);
		setEnteredEmailTouched(false);
		// if we don't setEnteredNameTouched back to false, we will still get feedback after submission, since we setEnteredName to an empty string just above (after we submit and reset setEnteredName, it's a brand new, untouched form)
	};

	const nameInputClasses = nameInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					// ref={nameInputRef}
					type='text'
					id='name'
					onChange={nameInputChangeHandler}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
					<p className='error-text'>Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					onChange={emailInputChangeHandler}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && (
					<p className='error-text'>Enter a valid email.</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;

// there are two approaches for fetching the entered value (user input): listen to every keystroke and store the value in some state variable, or to use a ref to fetch the input once the user is done with typing in a value. here we have both, but we typically only use one. which one? it depends on what you plan to do with the entered value. if you are interested on it only once (when the form is submitted), then a ref might be better (updating state on every keystroke is a bit overkill in this situation). but if you need the value with every keystroke, for example for instant validation, then the other approach using the state will be better. another situation when the state approach is better is when you want to reset the input, for example after submission (see above).

// you want to use some validation in the input, so you cannot submit the form when the input is empty (we don't want to send empty data to the server) (although, NOTE THAT the client side validation that we are doing in the browser is not everything that we should be doing. you should always validate the input in the server, because the code in the browser can be edited by the users (users can go to the source code in 'sources' in devtools and change the js source code), therefore client side validation is not realiable, it's just there to provide a good user experience, it's not a security mechanism or anything like that).
