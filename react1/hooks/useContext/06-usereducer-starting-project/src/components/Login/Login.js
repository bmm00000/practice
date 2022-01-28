import React, { useState, useEffect, useContext, useRef } from 'react';

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

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

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
		if (formIsValid) {
			authCtx.onLogin(enteredEmail, enteredPassword);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
		// above, we want to focus the first input field that is not valid. in order to do that, we could go to Input.js, use useRef there and apply the focus() method on the input dom object to which we have access through the ref, when we use the ref prop in the built-in 'input' component (we could use useEffect to focus the input after it renders for the first time).
		// But what we will do is to define the function 'activate' in Input.js, and we will invoke it from Login.js (outside of Input.js). this way, we will be able to use the focus method (we call it 'activate') on your custom Input component (the same way that the focus() method can be used in the built-in 'input' component). HOWEVER, custom components CANNOT be given refs!! ('ref' is a reserved word for built-in components) how to solve this? we will use the useImperativeHandle hook in the Input component.
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					type='email'
					id='email'
					label='Email'
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					inputIsValid={emailIsValid}
				/>
				<Input
					ref={passwordInputRef}
					type='password'
					id='password'
					label='Password'
					value={enteredPassword}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					inputIsValid={passwordIsValid}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;

// we use the useImperativeHandle hook in order to interact with the Input component imperatively (for example, by calling a function inside of the component from outside of the component) (this is something that you have to avoid, since it's not the typical pattern of doing things in react, but it might be useful sometimes). the useImperativeHandle hook allows us to use the functionality inside of a component in an imperative way, ie. not through the regular state props management, not by controlling the component through state in the parent component, etc. but instead by calling or manipulating something inside of the component programmatically (again, this is something that you will rarely need to use).
