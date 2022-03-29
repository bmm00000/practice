// IN STEP-4 WE ARE GOING TO REFACTOR OUR CODE AND ADD OVERALL FORM VALIDATION:
// we don't need the useRef.
// also, in the end, what we want to to find out is if the input is invalid and was touched, in which case we want to show the invalid message to the user. therefore, we don't need to manage a separate enteredNameIsValid state, and we can use the enteredNameIsValid variable.
// overall form validation: all the inputs have to be valid; if just one input is not valid, the overall form will not be valid.

import { useState } from 'react';
// import {useEffect} from 'react'

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	// const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); we can simplify our code and eliminate this state with the enteredNameIsValid variable, below.
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	// const [formIsValid, setFormIsValid] = useState(false);
	// in addition to the validity of the individual inputs, we are going to manage the validity of the whole form with the formIsValid state, and useEffect (we want to update formIsValid, whenever any of the inputs changes). but we don't even need this state, we can refactor and eliminate this state and the useEffect below.
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredEmailTouched, setEnteredEmailTouched] = useState('');

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
	// we can do this, because these variables will be recreated every time that the component is re-evaluated, so they will have access to the updated states.

	const enteredEmailIsValid = enteredEmail.includes('@');
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	// useEffect(() => {
	// 	if (enteredNameIsValid && enteredEmailIsValid) {
	// 		setFormIsValid(true);
	// 	} else {
	// 		setFormIsValid(false);
	// 	}
	// }, [enteredNameIsValid, enteredEmailIsValid]);
	// but we don't even need the useEffect, since we are not performing any side effect here! (remember what side effects are). therefore, we can get rid of the formIsValid state, and do the following:
	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

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

		console.log(enteredName, enteredEmail);

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
					<p className='error-text'>Enter a valid email!</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
