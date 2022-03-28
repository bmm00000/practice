import { useState } from 'react';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

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
	};

	const emailInputChangeHandler = (event) => {
		setEnteredEmail(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const emailInputBlurHandler = (event) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		if (!enteredNameIsValid || !enteredEmailIsValid) {
			return;
		}

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
