import { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoritesContext from '../../store/favorites-context';

const MainNavigation = () => {
	const favoritesCtx = useContext(FavoritesContext);

	return (
		<>
			<h1>My Meetups App!</h1>
			<ul>
				<li>
					<Link to='/'>All meetups</Link>
				</li>
				<li>
					<Link to='/favorites'>Favorites {favoritesCtx.totalFavorites}</Link>
				</li>
				<li>
					<Link to='/new'>Add new meetup</Link>
				</li>
			</ul>
		</>
	);
};

export default MainNavigation;
