import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);

	const isLoggedIn = authCtx.isLoggedIn;

	const logoutHandler = () => {
		authCtx.logout();
		// we could also redirect the user here, so you don't stay in the profile page (where you can change the password) after you logout while being the profile page. but we will solve this in another way: navigation guards (protecting frontend pages in our frontend react app)
	};

	return (
		<header className={classes.header}>
			<Link to='/'>
				<div className={classes.logo}>React Auth</div>
			</Link>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link to='/auth'>Login</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<Link to='/profile'>Profile</Link>
						</li>
					)}
					{isLoggedIn && (
						<li>
							<button onClick={logoutHandler}>Logout</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;

// what do we do when we click on the Logout button? remember, the main idea of the token approach is that the server does not store any info about the logged in client. therefore, we don't need to send any request, because firebase doesn't care if we are logged in. the only thing we need to change when we logout is our state: we have to make sure that we clear our token in the context api (we set the token back to an empty string or to null)
