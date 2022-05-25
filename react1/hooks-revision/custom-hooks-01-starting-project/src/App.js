import React, { useContext, Fragment } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './context/auth-context';

const App = (props) => {
	const authCtx = useContext(AuthContext);

	return (
		<Fragment>
			{!authCtx.isAuth && <Auth />}
			{authCtx.isAuth && <Ingredients />}
		</Fragment>
	);

	// // another way to render the same:
	// let content = <Auth />;
	// if (authCtx.isAuth) {
	// 	content = <Ingredients />;
	// }
	// return content;
};

export default App;
