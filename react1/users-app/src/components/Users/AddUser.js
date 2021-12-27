import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
	const [enteredUsername, setEnteredUsername] = useState('');
	const [enteredAge, setEnteredAge] = useState('');
	// anything that is entered as an input is always retrieved as a string (that's how js and the dom work), that's why we initialize 'enteredAge' as an empty string
	const [error, setError] = useState();
	// initially, our error is undefined.

	const usernameChangeHandler = (event) => {
		setEnteredUsername(event.target.value);
	};

	const ageChangeHandler = (event) => {
		setEnteredAge(event.target.value);
	};

	const addUserHandler = (event) => {
		event.preventDefault();

		if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
			setError({
				title: 'Fill in the inputs!',
				message: 'Sorry, the inputs cannot be empty like that...',
			});
			return;
		}
		if (+enteredAge < 1) {
			setError({
				title: 'Negative age?',
				message: 'Sorry, the age cannot be negative like that...',
			});
			return;
		}

		// const newUser = {
		// 	name: enteredUsername,
		// 	age: +enteredAge,
		// 	id: Math.random().toString(),
		// };

		props.onAddUser(enteredUsername, enteredAge);
		setEnteredUsername('');
		setEnteredAge('');
	};

	const errorHandler = () => {
		setError(null);
		setEnteredUsername('');
		setEnteredAge('');
	};

	return (
		<div>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={classes.input}>
				<form action='' onSubmit={addUserHandler}>
					<label htmlFor='username'>User</label>
					<input
						type='text'
						id='username'
						value={enteredUsername}
						// we add the 'value', so we have the current state to be reflected here every time that this component is rendered. if we only wanted to change the input content via keystrokes, we would not need to do this. however, we also want to change the input content when we submit the form (we want to make it empty). that's why we need to do this.
						onChange={usernameChangeHandler}
					/>
					<label htmlFor='age'>Age</label>
					<input
						type='number'
						id='age'
						value={enteredAge}
						onChange={ageChangeHandler}
					/>
					<Button type='submit'>Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;
