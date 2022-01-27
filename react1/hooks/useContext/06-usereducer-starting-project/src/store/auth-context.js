import React, { useState } from 'react';

// we create a context object (as an argument, createContext takes a default context, ie. your app-wide state. it can be just a string, or whatever, but often it will be an object):
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	// we add a dummy function, so we have autocompletion when we are using the context in other components
});
// createContext returns an object that contains a component (in the 'Provider' property), and all the components (and their children) that we wrap around using this component will have access to the context

// context management component where we extract the context management logic:
export const AuthContextProvider = (props) => {
	return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
