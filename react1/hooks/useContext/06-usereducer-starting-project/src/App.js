import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
		>
			{/* as 'value', we are passing an object with the key that we want and the state as a value. therefore, every time the state is updated, the new state will be able to be consumed by all components */}
			<MainHeader />
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
				{/* above, you pass loginHandler and logoutHandler as props, because they will be used directly in the Login and Home components, so you don't need to use context here. (you will pass it down to the Button component, but the Button component is just for presentation/style, and you would not want to use useContext in the Button component, otherwise the Button component as we have it (for style) would not be reusable for other parts in our app (it would only be useful in situations when we need to logout))
        SUMMARIZING: IN MOST CASES, YOU WILL USE PROPS TO PASS DATA TO YOUR COMPONENTS. ONLY IF YOU HAVE SOMETHING THAT YOU WOULD NEED TO PASS THROUGH A LOT OF COMPONENTS IN A CHAIN, AND THE FINAL RECEIVING COMPONENT DOES SOMETHING VERY SPECIFIC RELATED TO THAT DATA (YOU WON'T NEED TO REUSE IT FOR OTHER PURPOSES), THEN YOU USE CONTEXT */}
			</main>
		</AuthContext.Provider>
	);
}

export default App;
