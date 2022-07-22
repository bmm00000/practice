// IN STEP-3 WE ARE VALIDATING ON FORM SUBMISSION, AND ALSO WHEN INPUT LOSES FOCUS, AND ALSO ON KEYSTROKE AFTER THE USER HAS ENTERED A WRONG VALUE, SO THE ERROR MESSAGE DISAPPEARS AS SOON AS THE USER ENTERS A CORRECT VALUE (note that we don't want to validate only on keystroke from the beginning, since we would be showing error messages without giving a chance to the user to provide a valid message first. only after we have given the user a chance (ie. after the user blurs or tries to submit the form), then we apply the validation on keystroke in order to make the error messages dissapear as soon as the user enters a valid value:

import { useState, useRef } from 'react';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const nameInputRef = useRef();

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);

		// our goal here is to make the warning disappear as soon as we do a new keystroke:
		if (event.target.value.trim() !== '') {
			setEnteredNameIsValid(true);
		}
		// we use event.target.value in line 16, not enteredName, because state updates are scheduled, so maybe it will not happen as instantly as we need, so we end up not having the updated enteredName (you can change it and try it, and see how the browser behaves).
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
		}
	};
	// we are doing this, because maybe it happens that the user inputs something, but then deletes it all, and then blurs (or maybe the user blurs without giving any input), we want to give feedback also in this situation, even before the form gets submitted.

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);

		console.log(enteredName);
		console.log(nameInputRef.current.value);

		setEnteredName('');

		setEnteredNameTouched(false);
	};

	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const nameInputClasses = nameInputIsInvalid
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
					ref={nameInputRef}
				/>
				{nameInputIsInvalid && (
					<p className='error-text'>Name must not be empty.</p>
				)}
			</div>
			<div className='form-actions'>
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
