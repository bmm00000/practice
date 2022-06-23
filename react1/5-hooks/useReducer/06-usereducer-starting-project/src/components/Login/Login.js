import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Login.module.css';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};
// we create the reducer function outside of the component function, because inside the function we will not need any data that is generated inside of the component function (it doesn't need to interact with anything inside of the component function). all the data that will be passed into this function will be passed by react authomatically.

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});
	// we set 'isValid' from false to null, because we don't want the input to appear on red when we load the page for the first time
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	useEffect(() => {
		console.log('EFFECT RUNNING');

		return () => {
			console.log('EFFECT CLEANUP');
		};
	}, []);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;
	// if you use the {} on the left side of the =, then you are using the object destructuring syntax, and if you use the :, then you are assigning an alias, not assigning a value, since you are on the left side of the =

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');
			setFormIsValid(emailIsValid && passwordIsValid);
			// in this case, setFormIsValid will run with the latest state values (emailState and passwordState). they will be updated, because we are using useEffect, and this function runs after emailState and passwordState (the dependencies) have changed. therefore, in this case, it's ok to update a state with another state (because useEffect only runs AFTER the state updates (the dependencies)).
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);
	// if we add as dependencies emailState and passwordState, the problem we will have is that this useEffect will run too often, since it will run even when emailState.val or passwordState.val change, and we are not interested in that, we are only interested in changes of emailState.isValid and passwordState.isValid. in order to fix this, we will use object destructuring with an alias assignment (we use aliases because isValid is the same key for both states) (see above the useEffect). now, when the input changes, but the validity doesn't change, the effect will not run. you can use this optimization also when you have props as dependency, and you want the effect to be run when some props change, not all of them.

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
		// it's up to you whatever the action is, it might be just a string identifier, a number, or anything, but often it will be an object which has some field that holds an identifier

		// setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
		// as we can see, our code is still not optimal, since above we are updating a state using another state. also, the validity of the form is related to the other states, so we didn't optimize that. that's why we commented out the above, and will use useEffect instead.
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
		// all that we care about here is that the input lost focus, there's no extra data that needs to be added.
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={passwordState.value}
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

// Adding Nested Properties As Dependencies To useEffect:

// In the previous lecture, we used object destructuring to add object properties as dependencies to useEffect().

// const { someProperty } = someObject;
// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someProperty]);
// This is a very common pattern and approach, which is why I typically use it and why I show it here (I will keep on using it throughout the course).

// I just want to point out, that the key thing is NOT that we use destructuring but that we pass specific properties instead of the entire object as a dependency.

// We could also write this code and it would work in the same way.

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject.someProperty]);
// This works just fine as well!

// But you should avoid this code:

// useEffect(() => {
//   // code that only uses someProperty ...
// }, [someObject]);
// Why?

// Because now the effect function would re-run whenever ANY property of someObject changes - not just the one property (someProperty in the above example) our effect might depend on.
