import { Route, Switch } from 'react-router-dom';
// we use these components to define which component should be loaded for which path.

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

// 'path' (eg. '/favorites') is what comes after the domain (eg. 'localhost:3000' or 'mypage.com') in the url.
// if we don't use 'Switch', react-router-dom checks all the paths and will always include AllMeetUpsPage, since it checks all paths, and since AllMeetUpsPage is included in the other two, it will always render it (we may want this type of behaviour in certain applications, but in most cases not).
// 'Switch' tells React that only one of the routes should be active.
// However, 'Switch' checks if the url starts with the path defined, and it stops when it hits a match, therefore it will give us 'AllMeetupPages' even if the url is 'localhost:3000/favourites', for example. That's why we add the 'exact={true}' or just 'exact' (you can shorten a prop like that when you want to equal it to a truthy value). the 'exact' prop tells react router that for that particular route, it should to check whether the path begins with '/', but whether the full path matches '/'
