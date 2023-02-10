import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const history = useHistory();
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		// we could add some validation here (check if we have an invalid password, eg. only have empty spaces, etc.)

		fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBT8Uuc_bI2KgAF6-pZSOU7Q-QaLwAroOI',
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPassword,
					returnSecureToken: false,
					// set returnSecureToken to 'true' if we want to get a new token in response.
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		).then((res) => {
			// we are assuming that this always succeeds (changing the password worked!)

			history.replace('/');
		});
		// you could catch errors here (for example, firebase will throw an error if the password is less than 4 characters, etc.). but to keep things simple, instead we are going to add the minLength attribute to the input below (this is not the only form of validation that you should rely on, since this can be disabled with the devtools). but again, to keep things simple, we are going to assume that this always succeeds.
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					id='new-password'
					ref={newPasswordInputRef}
					minLength='6'
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
