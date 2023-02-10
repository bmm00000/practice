import React, { useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('token');
	const storedExpirationDate = localStorage.getItem('expirationTime');

	const remainingTime = calculateRemainingTime(storedExpirationDate);

	// if the remaining time is less than 1 minute (6000 milliseconds), you don't want to log the user in:
	if (remainingTime <= 6000) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return { token: storedToken, duration: remainingTime };
};
// we want to store in the browser the expiration time, so that if we auto login the user (this happens when the user reloads the page), and we retreive the token from localStorage, we only use that as an initial token, if there's a remaining duration for that token (eg. if the user logged in 3 hours ago, then the stored token is worthless). therefore, we only want to retrieve the token if it's still valid, otherwise we want to delete it.

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();
	let initialToken;
	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);
	// when the app starts, you want to make sure that you look into the localStorage of the browser to check if there is a token, and if there's a token, then you want to use it to authenticate the user authomatically (you want to initialize your state with that token) (the token that you get will be undefined or the existing token)
	// we don't even need useEffect, since localStorage is an asynchronous api, and we can set the initial 'token' value by looking into localStorage before anything else

	const userIsLoggedIn = !!token;
	// '!!' converts a truthy or falsy value into a 'true' or 'false' boolean value

	const logoutHandler = () => {
		setToken(null);
		localStorage.removeItem('token');
		// you could call the 'clear' method to remove all data, or 'removeItem' to target specific keys

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		// this is an api built into the browser:
		localStorage.setItem('token', token);
		// setItem allows us to set a key value pair in that local storage: how you name the key is up to you (localStorage is only able to store primitive type values, like strings or numbers; if you want to store an object, you have to convert it to json before you can store it as a string)
		localStorage.setItem('expirationTime', expirationTime);

		const remainingTime = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};
	// but the token expires after certain duration, so we have to remove it authomatically from localStorage as well, after that duration. in order to do that, we will set a timer, but also store the remaining duration (expiration time) in localStorage, so we always set the timer correctly, even after reloading the page.

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

// another problem we have: when you reload or manually enter a url, you lose the authentication status, because, the way the browser works, is every time you reload, you re-start the app, and that means that all your state in the context is lost. but we want to ensure that the user stays logged in, at least for a certain period of time (the token will expire after certain period of time, we get that period of time as part of the response when we log in or sign up: look at firebase documentation: sign in or sign up with email/password > Response Payload > expiresIn (the default will be one hour; you could refresh it with refreshToken, but that's a bit too advanced for the time being)): therefore, by default, we can stay logged in for an hour, even if we refresh the page. for that, we need to store the token somewhere outside of our react state (because state will be cleared when the page reloads). thankfully, browsers have storage mechanisms that we can use, for example, cookies. but an even easier storage mechanism is localStorage.
// (comparison between cookies and localStorage:
// 	https://academind.com/tutorials/localstorage-vs-cookies-xss
// 	long story short: using localStorage will only be a problem if your page is vulnerable to cross site scripting attacks, but if that's the case you will have a lot of problems anyways)
// 	we will use localStorage: storage mechanism built into the browser which allows us to store simple data that will survive page reloads
