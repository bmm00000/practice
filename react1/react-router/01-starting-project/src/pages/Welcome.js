import { Route } from 'react-router-dom';

function Welcome() {
	return (
		<section>
			<h1>The Welcome Page</h1>
			<Route path='/welcome/new-user'>
				<p>Welcome new user!</p>
			</Route>
		</section>
	);
}

export default Welcome;

// you are not limited to define routes in one place only, you can do it anywhere you want, so you can have nested routes if you want. if the routes are on a component that is currently active, they will be evaluated by react-router (otherwise, they won't be evaluated)
