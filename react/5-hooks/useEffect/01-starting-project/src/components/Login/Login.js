import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('');
	const [emailIsValid, setEmailIsValid] = useState();
	const [enteredPassword, setEnteredPassword] = useState('');
	const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	// remember: if no array of dependencies, the side effect function runs after every time the component gets rendered; if empty array of dependencies, it runs after the component gets rendered for the first time; otherwise, it runs after the dependencies changed
	// rule of thumb: you add as dependencies what you are using in your side effect function (every time that enteredEmail and enteredPassword changes (with every keystroke), we check if the form is valid):
	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking for validity...');
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6
			);
		}, 500);
		return () => {
			console.log('Cleaning up...');
			clearTimeout(identifier);
		};
	}, [enteredEmail, enteredPassword]);
	// here we are checking the validity of the form, and we can live with checking with every key stroke. however, imagine that you are sending an http request to check if a certain username is already in use. you don't want to do that with every key stroke.
	// even the checking the validity of the form is not something that you might want to do with every key stroke. instead what you may want to do is to collect certain amount of key strokes, or to wait for some time (a long enough pause) after the last key stroke:  I don't care about the validity of the form while the user is typing, I only care when the user stops typing (after a long enough pause)! this pause approach is called 'debouncing', and to implement it we use the Cleanup function that we can return with useEffect (this function will be executed as cleanup before the useEffect function gets executed the next time (except for the very first time), and also will be executed before the component unmounts from the DOM, ie. whenever the component is reused, or before the component is removed (for example, if you had an empty dependencies array, the cleanup function would be executed only once, before the component is removed))).

	const emailChangeHandler = (event) => {
		setEnteredEmail(event.target.value);

		// instead of having the following state updating function duplicated, we use it only in use place above, in useEffect:
		// setFormIsValid(
		// 	event.target.value.includes('@') && enteredPassword.trim().length > 6
		// );
	};

	const passwordChangeHandler = (event) => {
		setEnteredPassword(event.target.value);

		// setFormIsValid(
		// 	event.target.value.trim().length > 6 && enteredEmail.includes('@')
		// );
	};

	const validateEmailHandler = () => {
		setEmailIsValid(enteredEmail.includes('@'));
	};

	const validatePasswordHandler = () => {
		setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(enteredEmail, enteredPassword);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={enteredEmail}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={enteredPassword}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
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

// What to add & Not to add as Dependencies:::
// In the previous lecture, we explored useEffect() dependencies.

// You learned, that you should add "everything" you use in the effect function as a dependency - i.e. all state variables and functions you use in there.

// That is correct, but there are a few exceptions you should be aware of:

// You DON'T need to add state updating functions (as we did in the last lecture with setFormIsValid): React guarantees that those functions never change, hence you don't need to add them as dependencies (you could though)

// You also DON'T need to add "built-in" APIs or functions like fetch(), localStorage etc (functions and features built-into the browser and hence available globally): These browser APIs / global functions are not related to the React component render cycle and they also never change

// You also DON'T need to add variables or functions you might've defined OUTSIDE of your components (e.g. if you create a new helper function in a separate file): Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)

// So long story short: You must add all "things" you use in your effect function if those "things" could change because your component (or some parent component) re-rendered. That's why variables or state defined in component functions, props or functions defined in component functions have to be added as dependencies!

// Here's a made-up dummy example to further clarify the above-mentioned scenarios:

// import { useEffect, useState } from 'react';

// let myTimer;

// const MyComponent = (props) => {
//   const [timerIsActive, setTimerIsActive] = useState(false);

//   const { timerDuration } = props; // using destructuring to pull out specific props values

//   useEffect(() => {
//     if (!timerIsActive) {
//       setTimerIsActive(true);
//       myTimer = setTimeout(() => {
//         setTimerIsActive(false);
//       }, timerDuration);
//     }
//   }, [timerIsActive, timerDuration]);
// };
// In this example:

// timerIsActive is added as a dependency because it's component state that may change when the component changes (e.g. because the state was updated)

// timerDuration is added as a dependency because it's a prop value of that component - so it may change if a parent component changes that value (causing this MyComponent component to re-render as well)

// setTimerIsActive is NOT added as a dependency because it's that exception: State updating functions could be added but don't have to be added since React guarantees that the functions themselves never change

// myTimer is NOT added as a dependency because it's not a component-internal variable (i.e. not some state or a prop value) - it's defined outside of the component and changing it (no matter where) wouldn't cause the component to be re-evaluated

// setTimeout is NOT added as a dependency because it's a built-in API (built-into the browser) - it's independent from React and your components, it doesn't change
