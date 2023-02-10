import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
	const {
		inputValue: nameInput,
		inputContentValid: nameInputValid,
		inputHasError: nameInputIsInValid,
		onInputChangeHandler: onNameInputChangeHandler,
		onInputBlurHandler: onNameInputBlurHandler,
		reset: resetName,
	} = useInput((value) => value.trim() !== '');

	const {
		inputValue: emailInput,
		inputContentValid: emailInputValid,
		inputHasError: emailInputIsInvalid,
		onInputChangeHandler: onEmailInputChangeHandler,
		onInputBlurHandler: onEmailInputBlurHandler,
		reset: resetEmail,
	} = useInput((value) => value.includes('@'));

	let formIsValid = false;
	if (nameInputValid && emailInputValid) {
		formIsValid = true;
	}

	const onFormSubmit = (event) => {
		event.preventDefault();

		if (!nameInputValid || !emailInputValid) {
			return;
		}

		console.log(nameInput);
		console.log(emailInput);

		resetName();
		resetEmail();
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
