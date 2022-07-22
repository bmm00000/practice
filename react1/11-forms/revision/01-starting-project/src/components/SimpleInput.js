import { useState } from 'react';

const SimpleInput = (props) => {
	const [nameInput, setNameInput] = useState('');
	const [nameInputTouched, setNameInputTouched] = useState(false);

	const [emailInput, setEmailInput] = useState('');
	const [emailInputTouched, setEmailInputTouched] = useState(false);

	const nameInputValid = nameInput.trim() !== '';
	const nameInputIsInValid = !nameInputValid && nameInputTouched;

	const emailInputValid = emailInput.includes('@');
	const emailInputIsInvalid = !emailInputValid && emailInputTouched;

	let formIsValid = false;
	if (nameInputValid && emailInputValid) {
		formIsValid = true;
	}

	const onNameInputChangeHandler = (event) => {
		setNameInput(event.target.value);
	};

	const onNameInputBlurHandler = (event) => {
		setNameInputTouched(true);
	};

	const onEmailInputChangeHandler = (event) => {
		setEmailInput(event.target.value);
	};

	const onEmailInputBlurHandler = (event) => {
		setEmailInputTouched(true);
	};

	const onFormSubmit = (event) => {
		event.preventDefault();

		setNameInputTouched(true);
		setEmailInputTouched(true);

		if (!nameInputValid || !emailInputValid) {
			return;
		}

		console.log(nameInput);
		console.log(emailInput);

		setNameInput('');
		setNameInputTouched(false);

		setEmailInput('');
		setEmailInputTouched(false);
	};

	const nameInputClasses = nameInputIsInValid
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={onFormSubmit}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={onNameInputChangeHandler}
					onBlur={onNameInputBlurHandler}
					value={nameInput}
				/>
				{nameInputIsInValid && (
					<p className='error-text'>The input cannot be empty!</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='text'
					id='email'
					onChange={onEmailInputChangeHandler}
					onBlur={onEmailInputBlurHandler}
					value={emailInput}
				/>
				{emailInputIsInvalid && (
					<p className='error-text'>The input has to be a valid email!</p>
				)}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
