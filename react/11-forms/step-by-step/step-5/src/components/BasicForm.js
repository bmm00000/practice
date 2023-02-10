import useInput1 from '../hooks/use-input1';

const BasicForm = (props) => {
	const isNotEmpty = (value) => value.trim() !== '';
	const isEmail = (value) => value.includes('@');

	const {
		value: firstName,
		valueIsValid: firstNameIsValid,
		inputIsInvalid: firstNameIsInvalid,
		onInputChange: onFirstNameChange,
		onInputBlur: onFirstNameBlur,
		onReset: onFirstNameReset,
	} = useInput1(isNotEmpty);
	const {
		value: lastName,
		valueIsValid: lastNameIsValid,
		inputIsInvalid: lastNameIsInvalid,
		onInputChange: onLastNameChange,
		onInputBlur: onLastNameBlur,
		onReset: onLastNameReset,
	} = useInput1(isNotEmpty);
	const {
		value: email,
		valueIsValid: emailIsValid,
		inputIsInvalid: emailIsInvalid,
		onInputChange: onEmailChange,
		onInputBlur: onEmailBlur,
		onReset: onEmailReset,
	} = useInput1(isEmail);

	let formIsValid = false;
	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const onFormSubmission = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}
		// even though the submit button is disabled, the user could theoretically enable the submit button with the dev tools, that's why we also cover this situation.

		console.log(firstName, lastName, email);

		onFirstNameReset();
		onLastNameReset();
		onEmailReset();
	};

	const firstNameInputClasses = firstNameIsInvalid
		? 'form-control invalid'
		: 'form-control';

	const lastNameInputClasses = lastNameIsInvalid
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailIsInvalid
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={onFormSubmission}>
			<div className='control-group'>
				<div className={firstNameInputClasses}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={onFirstNameChange}
						onBlur={onFirstNameBlur}
						value={firstName}
					/>
					{firstNameIsInvalid && (
						<p className='error-text'>Enter a valid first name!</p>
					)}
				</div>
				<div className={lastNameInputClasses}>
					<label htmlFor='name'>Last Name</label>
					<input
						type='text'
						id='name'
						onChange={onLastNameChange}
						onBlur={onLastNameBlur}
						value={lastName}
					/>
					{lastNameIsInvalid && (
						<p className='error-text'>Enter a valid last name!</p>
					)}
				</div>
			</div>
			<div className={emailInputClasses}>
				<label htmlFor='name'>E-Mail Address</label>
				<input
					type='text'
					id='name'
					onChange={onEmailChange}
					onBlur={onEmailBlur}
					value={email}
				/>
				{emailIsInvalid && <p className='error-text'>Enter a valid email!</p>}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;

// with third party packages like 'formik' you can write less state logic and only validation logic, which will save a lot of code (in a similar way to what we did with our custom hooks, but 'formik' allows us to outsource even more logic to it). if you want to dive deeper into custom hooks for forms:
// https://academind.com/tutorials/reactjs-a-custom-useform-hook
