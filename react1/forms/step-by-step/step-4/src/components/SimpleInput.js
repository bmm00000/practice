// IN STEP-4 WE ARE GOING TO REFACTOR OUR CODE:
// we don't need the useRef.
// also, in the end, what we want to to find out if the input is invalid and was touched, in which case we want to show the invalid message to the user. therefore, we don't need to manage a separate enteredNameIsValid state, and we can use the enteredNameIsValid constant:

import { useState } from 'react';

const SimpleInput = (props) => {
	const [enteredName, setEnteredName] = useState('');
	// const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); we can simplify our code and eliminate this state with the enteredNameIsValid variable, below.
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const nameInputChangeHandler = (event) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();

		setEnteredNameTouched(true);

		if (!enteredNameIsValid) {
			return;
		}
		// we can do this, because the formSubmissionHandler function will be recreated every time that the component is re-evaluated, so it will have access to the updated value of enteredNameIsValid.

		console.log(enteredName);

		setEnteredName('');
		setEnteredNameTouched(false);
	};

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
