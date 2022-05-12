import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
	const history = useHistory();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const authCtx = useContext(AuthContext);

	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// we could add some validation here (check if fields are empty, etc.), but for the sake of simplicity, we are not going to do it now.

		setIsLoading(true);
		let url;
		if (isLogin) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBT8Uuc_bI2KgAF6-pZSOU7Q-QaLwAroOI';
		} else {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBT8Uuc_bI2KgAF6-pZSOU7Q-QaLwAroOI';
		}
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				email: enteredEmail,
				password: enteredPassword,
				returnSecureToken: true,
			}),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					return res.json();
					// we will get here the idToken, which is what the client will need to make subsequent requests.
				} else {
					// we are returning a nested promise chain:
					return res.json().then((data) => {
						// console.log(data);
						// we could show an error modal, etc:
						let errorMessage = 'Authentication failed!';
						// if (data && data.error && data.error.message) {
						// 	message = data.error.message;
						// }
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				// we will get here the idToken, which is what the client will need to make subsequent requests:
				authCtx.login(data.idToken);
				history.replace('/');
				// 'replace' will redirect the user, without allowing to press the 'back' button.
			})
			.catch((err) => {
				alert(err.message);
			});
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
					{!isLoading && (
						<button>{isLogin ? 'Login' : 'Create Account'}</button>
					)}
					{isLoading && <p>Loading...</p>}
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
