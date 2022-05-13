import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
	const authCtx = useContext(AuthContext);

	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<HomePage />
				</Route>
				{!authCtx.isLoggedIn && (
					<Route path='/auth'>
						<AuthPage />
					</Route>
				)}
				<Route path='/profile'>
					{authCtx.isLoggedIn && <UserProfile />}
					{!authCtx.isLoggedIn && <Redirect to='/auth' />}
				</Route>
				{/* just in case the user enters the '/profile' url without being authenticated */}
				<Route path='*'>
					<Redirect to='/' />
				</Route>
				{/* we are adding here a wild card for any other situation. we could render a 404 page, or redirect the user, we will do the latter */}
			</Switch>
		</Layout>
	);
}

export default App;

// we have some issues: we stay on the profile page even if we log out, but we have a bigger problem: even if we are not logged in, you can manually enter '/profile' and load the profile page, even though you should not be able to access it (this is not a big problem because if you try to change the password, it will fail because you provide an invalid token (null), but you still want to ensure that you cannot visit the profile page if you are not logged in): you can solve this by adding navigation guards (dynamically change your route configuration depending on whether you are logged in or not)
