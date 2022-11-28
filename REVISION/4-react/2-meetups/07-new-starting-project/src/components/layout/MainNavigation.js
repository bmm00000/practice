import { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoritesContext from '../../store/favorites-context';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
	const favoritesCtx = useContext(FavoritesContext);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>Our Wonderful Meetups Website</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>All Meetups</Link>
					</li>
					<li>
						<Link to='/favorites'>Favorites</Link>
						<span className={classes.badge}>{favoritesCtx.totalFavorites}</span>
					</li>
					<li>
						<Link to='/new-meetup'>New Meetup</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
