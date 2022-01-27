import React, { useState, useEffect, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		console.log('EFFECT RUNNING');

		return () => {
			console.log('EFFECT CLEANUP');
		};
	}, []);

	// useEffect(() => {
	//   const identifier = setTimeout(() => {
	//     console.log('Checking form validity!');
	//     setFormIsValid(
	//       enteredEmail.includes('@') && enteredPassword.trim().length > 6
	//     );
	//   }, 500);

	//   return () => {
	//     console.log('CLEANUP');
	//     clearTimeout(identifier);
	//   };
	// }, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);

		setFormIsValid(
			event.target.value.includes('@') && enteredPassword.trim().length > 6
		);
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		setFormIsValid(
			enteredEmail.includes('@') && event.target.value.trim().length > 6
		);
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		authCtx.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					type='email'
					id='email'
					label='Email'
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					inputIsValid={emailIsValid}
				/>
				<Input
					type='password'
					id='password'
					label='Password'
					value={enteredPassword}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					inputIsValid={passwordIsValid}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
