import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}
	return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
	return { value: '', isValid: false };
};

const Login = () => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		console.log('EFFECT RUNNING');

		return () => {
			console.log('EFFECT CLEANUP');
		};
	}, []);

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const identifier = setTimeout(() => {
			console.log('Checking form validity!');
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		return () => {
			console.log('CLEANUP');
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
		// above, we want to focus the first input field that is not valid. in order to do that, we could go to Input.js, use useRef there and apply the focus() method that we have natively on the input dom object to which we have access through the ref, in that case we would use the ref prop in the built-in 'input' component (we could use useEffect to focus the input after it renders for the first time, but in any case we would not focus the input after we click on the button).
		// But what we will do is to define the function 'activate' in Input, and we will invoke it from Login (outside of the Input component). this way, we will be able to use the focus method (we call it 'activate') on your custom Input component, from the parent Login component (the same way that the focus() method can be used in the built-in 'input' component). WE ARE DOING THIS BECAUSE custom components CANNOT be given refs!! ('ref' is a reserved word for built-in components) that's why we will use the useImperativeHandle hook in the Input component.
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					type='email'
					id='email'
					label='Email'
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					isValid={emailIsValid}
				/>
				<Input
					ref={passwordInputRef}
					type='password'
					id='password'
					label='Password'
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					isValid={passwordIsValid}
				/>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn}>
						{/* we deleted the 'disabled={!formIsValid}' prop from the Button, because we now want it to always be clickable, given the new logic that we have now in submitHandler */}
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;

// we use the useImperativeHandle hook in order to interact with the Input component imperatively (for example, by calling a function inside of the component from outside of the component) (this is something that you have to avoid, since it's not the typical pattern of doing things in react, but it might be useful sometimes). the useImperativeHandle hook allows us to use the functionality that is inside of a component, in an imperative way, ie. not through the regular state props management, not by controlling the component through state in the parent component, etc. but instead by calling or manipulating something inside of the component programmatically (again, this is something that you will rarely need to use).
