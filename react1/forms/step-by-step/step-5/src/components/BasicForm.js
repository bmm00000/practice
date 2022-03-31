import useInput1 from '../hooks/use-input1';

const BasicForm = (props) => {
	const {
		value: firstName,
		valueIsValid: firstNameIsValid,
		inputIsInvalid: firstNameIsInvalid,
		onInputChange: onFirstNameChange,
		onInputBlur: onFirstNameBlur,
		onReset: onFirstNameReset,
	} = useInput1((value) => value.trim() !== '');
	const {
		value: lastName,
		valueIsValid: lastNameIsValid,
		inputIsInvalid: lastNameIsInvalid,
		onInputChange: onLastNameChange,
		onInputBlur: onLastNameBlur,
		onReset: onLastNameReset,
	} = useInput1((value) => value.trim() !== '');
	const {
		value: email,
		valueIsValid: emailIsValid,
		inputIsInvalid: emailIsInvalid,
		onInputChange: onEmailChange,
		onInputBlur: onEmailBlur,
		onReset: onEmailReset,
	} = useInput1((value) => value.includes('@'));

	let formIsValid = false;
	if (firstNameIsValid && lastNameIsValid && emailIsValid) {
		formIsValid = true;
	}

	const onFormSubmission = (event) => {
		event.preventDefault();

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
