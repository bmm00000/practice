import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = (props) => {
	const [userName, setUserName] = useState('');
	const [userAge, setUserAge] = useState('');

	const addUserNameHandler = (event) => {
		setUserName(event.target.value);
	};

	const addUserAgeHandler = (event) => {
		setUserAge(event.target.value);
	};

	const addUserHandler = (event) => {
		event.preventDefault();
	};

	return (
		<Card className={classes.input}>
			<form action='' onSubmit={addUserHandler}>
				<label htmlFor='username'>User</label>
				<input
					type='text'
					id='username'
					value={userName}
					onChange={addUserNameHandler}
				/>
				<label htmlFor='age'>Age</label>
				<input
					type='number'
					id='age'
					value={userAge}
					onChange={addUserAgeHandler}
				/>
				<Button type='submit'>Add User</Button>
			</form>
		</Card>
	);
};

export default AddUser;
