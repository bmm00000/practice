import { Route, Switch } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AllMeetupsPage from './pages/AllMeetups';
import FaveMeetupsPage from './pages/FaveMeetups';
import NewMeetupPage from './pages/NewMeetup';

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<AllMeetupsPage />
				</Route>
				<Route path='/favorites'>
					<FaveMeetupsPage />
				</Route>
				<Route path='/new-meetup'>
					<NewMeetupPage />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;
