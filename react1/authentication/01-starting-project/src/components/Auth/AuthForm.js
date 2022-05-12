import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// we could add some validation here (check if fields are empty, etc.), but for the sake of simplicity, we are not going to do it now.

		if (isLogin) {
		} else {
			fetch(
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT8Uuc_bI2KgAF6-pZSOU7Q-QaLwAroOI',
				{
					method: 'POST',
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true,
					}),
					headers: { 'Content-Type': 'application/json' },
				}
			).then((res) => {
				if (res.ok) {
					// do something
				} else {
					// we are returning a nested promise chain:
					return res.json().then((data) => {
						// we could show an error modal, etc.
						console.log(data);
					});
				}
			});
		}
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='email'>Your Email</label>
					<input type='email' id='email' required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='password'>Your Password</label>
					<input
						type='password'
						id='password'
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					<button>{isLogin ? 'Login' : 'Create Account'}</button>
					<button
						type='button'
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? 'Create new account' : 'Login with existing account'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
