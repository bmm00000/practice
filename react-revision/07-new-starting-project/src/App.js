import { Route, Switch } from 'react-router-dom';

import AllMeetupsPage from './pages/AllMeetupsPage';
import FavoritesPage from './pages/FavoritesPage';
import NewMeetupPage from './pages/NewMeetupPage';

function App() {
	return (
		<div>
			<Switch>
				<Route path='/' exact>
					<AllMeetupsPage />
				</Route>
				<Route path='/favorites'>
					<FavoritesPage />
				</Route>
				<Route path='/new-meetup'>
					<NewMeetupPage />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
