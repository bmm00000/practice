import useMyinput from '../hooks/use-myinput';

const BasicForm = (props) => {
	const {
		value: name,
		valueIsValid: nameIsValid,
		valueHasError: nameHasError,
		onValueChangeHandler: onNameChangeHandler,
		onValueBlur: onNameBlur,
		reset: nameReset,
	} = useMyinput((value) => value.trim() !== '');

	const {
		value: lastName,
		valueIsValid: lastNameIsValid,
		valueHasError: lastNameHasError,
		onValueChangeHandler: onLastNameChangeHandler,
		onValueBlur: onLastNameBlur,
		reset: lastNameReset,
	} = useMyinput((value) => value.trim() !== '');

	const {
		value: email,
		valueIsValid: emailIsValid,
		valueHasError: emailHasError,
		onValueChangeHandler: onEmailChangeHandler,
		onValueBlur: onEmailBlur,
		reset: emailReset,
	} = useMyinput((value) => value.includes('@'));

	const formIsValid = nameIsValid && emailIsValid && lastNameIsValid;

	const onFormSubmit = (event) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		console.log(name);
		console.log(lastName);
		console.log(email);

		nameReset();
		lastNameReset();
		emailReset();
	};

	const nameClasses = `form-control ${nameHasError && 'invalid'}`;
	const lastNameClasses = `form-control ${lastNameHasError && 'invalid'}`;
	const emailClasses = `form-control ${emailHasError && 'invalid'}`;

	return (
		<form onSubmit={onFormSubmit}>
			<div className='control-group'>
				<div className={nameClasses}>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={onNameChangeHandler}
						onBlur={onNameBlur}
						value={name}
					/>
					{nameHasError && <p>Name field is empty!</p>}
				</div>
				<div className={lastNameClasses}>
					<label htmlFor='last-name'>Last Name</label>
					<input
						type='text'
						id='last-name'
						onChange={onLastNameChangeHandler}
						onBlur={onLastNameBlur}
						value={lastName}
					/>
					{lastNameHasError && <p>Last name field is empty!</p>}
				</div>
			</div>
			<div className={emailClasses}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					type='text'
					id='email'
					onChange={onEmailChangeHandler}
					onBlur={onEmailBlur}
					value={email}
				/>
				{emailHasError && <p>Invalid email!</p>}
			</div>
			<div className='form-actions'>
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default BasicForm;
