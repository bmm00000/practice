import { Route, Switch } from 'react-router-dom';

import AllMeetupsPage from './pages/AllMeetups';
import FavouritesPage from './pages/Favourites';
import NewMeetupPage from './pages/NewMeetup';
import Layout from './components/layout/Layout';

function App() {
	return (
		<Layout>
			<Switch>
				<Route path='/' exact>
					<AllMeetupsPage />
				</Route>
				<Route path='/favourites'>
					<FavouritesPage />
				</Route>
				<Route path='/new-meetup'>
					<NewMeetupPage />
				</Route>
			</Switch>
		</Layout>
	);
}

export default App;

// 'path' is what comes after the domain
// if we don't use 'Switch', react-router-dom checks all the paths and will always include AllMeetUpsPage, since it checks all paths, and since AllMeetUpsPage is included in the other two, it will also render it.
// 'Switch' tells React that only one of the routes should be active.
// However, 'Switch' checks if the url starts with the path defined, and it stops when it hits a match, therefore it will give us 'AllMeetupPages' even if the url is 'localhost:3000/favourites', for example. That's why we add the 'exact={true}' or just 'exact' (you can shorten a prop like that when you want to equal it to a truthy value)
