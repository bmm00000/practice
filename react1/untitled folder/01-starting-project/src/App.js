import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
	// if (storedUserLoggedInInformation) {
	// 	setIsLoggedIn(true);
	// }
	// but this would generate an infinite loop! that's why we use useEffect:

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
		if (storedUserLoggedInInformation) {
			setIsLoggedIn(true);
		}
	}, []);
	// the function is executed AFTER every component re-evalution (and if you update state inside the function, the component will run again) ONLY IF the dependencies changed.

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		// here is where we want to store the login data in the browser storage. the browser has multiple storages we can use (the most common for this situation would be cookies or local storage; we will use local storage because it's easy for our example; local storage is a storage mechanism built in the browser totally independent from react; localStorage is a global object available in the browser):
		localStorage.setItem('isLoggedIn', '1');
		// we give the item any identifier of our choice (a string), for example 'isLoggedIn'. and the second argument is also a string, for example '1' meaning user logged in, and '0' meaning user not logged in. then you can open the dev tools > Application tab > Local Storage > and you will find the key value pair. that's how you can store data. however, here, we store something when we execute this function, which is not every time the component is executed, that's why we don't need useEffect here. but how about when the app restarts because the user left the page and comes back or simply because we reload the page? then we want to check if in Local Storage we have that key value pair. in order to check if the user is logged in, just above this function, we could do the following: localStorage.getItem('isLoggedIn') (see above)
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	return (
		<React.Fragment>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	);
}

export default App;
