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

		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);

		if (!enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}
		// we can do this, because the formSubmissionHandler function will be recreated every time that the component is re-evaluated, so it will have access to the updated value of enteredNameIsValid.

		// setEnteredNameIsValid(true);

		setEnteredName('');
		setEnteredEmail('');

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
