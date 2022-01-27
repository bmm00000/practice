import React, { useState, useEffect } from 'react';

// we create a context object (as an argument, createContext takes a default context, ie. your app-wide state. it can be just a string, or whatever, but often it will be an object):
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
	// we add a dummy function, so we have autocompletion when we are using the context in other components
});
// createContext returns an object that contains a component (in the 'Provider' property), and all the components (and their children) that we wrap around using this component will have access to the context

// context management component where we extract the context management logic, so our App.js is now leaner (before, we had all this logic in App.js):
export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	const loginHandler = (email, password) => {
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
