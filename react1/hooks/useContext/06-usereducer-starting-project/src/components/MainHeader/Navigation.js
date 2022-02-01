import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = () => {
	// the Consumer takes a child that should be a function, and as an argument it will get your context data (the default context that we set up in auth-context.js), and in that function you will return your JSX code that has now access to that data (if we follow this approach, we don't even need to use a Provider in the App.js file (if we use it, it will crash our app; to make sure if doesn't crash, we can use a Provider but we should add a 'value' prop with the object, and now you will be able to change that object through state in the App component (you would not be able to update state in the App component without the Provider, because, without the Provider, you were just taking the default object from auth-context.js without being able to change it))). whenever state changes in App.js, the new 'value' will be passed down to all consuming components:
	// return (
	// <AuthContext.Consumer>
	// 	{(ctx) => {
	// 		return (
	// 			<nav className={classes.nav}>
	// 				<ul>
	// 					{ctx.isLoggedIn && (
	// 						<li>
	// 							<a href='/'>Users</a>
	// 						</li>
	// 					)}
	// 					{ctx.isLoggedIn && (
	// 						<li>
	// 							<a href='/'>Admin</a>
	// 						</li>
	// 					)}
	// 					{ctx.isLoggedIn && (
	// 						<li>
	// 							<button onClick={props.onLogout}>Logout</button>
	// 						</li>
	// 					)}
	// 				</ul>
	// 			</nav>
	// 		);
	// 	}}
	// </AuthContext.Consumer>
	// instead of using the Consumer, you can use the useContext hook, which is more elegant:
	// );

	const ctx = useContext(AuthContext);

	return (
		<nav className={classes.nav}>
			<ul>
				{ctx.isLoggedIn && (
					<li>
						<a href='/'>Users</a>
					</li>
				)}
				{ctx.isLoggedIn && (
					<li>
						<a href='/'>Admin</a>
					</li>
				)}
				{ctx.isLoggedIn && (
					<li>
						<button onClick={ctx.onLogout}>Logout</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navigation;
