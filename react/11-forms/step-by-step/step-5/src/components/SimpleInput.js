// IN STEP-5 WE ARE GOING TO outsource the duplicated logic that we have (becuase we are doing similar things for name, and email. imagine if we had more inputs...). in order to achieve this, you could create a custom Input component, with all the input logic there for validating it, touched status, etc., but in that case, to validate the whole form (by passing props, etc.) would be tricky. that's why we are going to follow another approach, we are going to use a custom hook.

// import useInput from '../hooks/use-input';
import useInputUseReducer from '../hooks/use-input-use-reducer';

const SimpleInput = (props) => {
	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangedHandler,
		inputBlurHandler: nameBlurHandler,
		reset: resetNameInput,
	} = useInputUseReducer((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: enteredEmailIsValid,
		hasError: emailInputHasError,
		valueChangeHandler: emailChangedHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmailInput,
	} = useInputUseReducer((value) => value.includes('@'));

	let formIsValid = false;
	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		// setEnteredNameTouched(true);
		// setEnteredEmailTouched(true);
		// we get rid of these, since the form cannot be submitted if the inputs are invalid anyways.

		// if (!enteredNameIsValid || !enteredEmailIsValid) {
		// 	return;
		// }
		// we get rid of these, since the form cannot be submitted if the inputs are invalid anyways.

		console.log(enteredName, enteredEmail);

		resetNameInput();
		resetEmailInput();
	};

	const nameInputClasses = nameInputHasError
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailInputHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					onChange={nameChangedHandler}
					onBlur={nameBlurHandler}
					value={enteredName}
				/>
				{nameInputHasError && (
					<p className='error-text'>Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='email'>Your Email</label>
				<input
					type='email'
					id='email'
					onChange={emailChangedHandler}
					onBlur={emailBlurHandler}
					value={enteredEmail}
				/>
				{emailInputHasError && (
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
