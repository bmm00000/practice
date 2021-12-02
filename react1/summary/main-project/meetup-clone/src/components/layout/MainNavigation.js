import { useContext } from 'react';
import { Link } from 'react-router-dom';

import FavoritesContext from '../../store/favorites.context';
import classes from './MainNavigation.module.css';
// imports an object with the classes (as properties) from this css file, and you can apply them in the JSX below (you can call it 'classes' or any other name you want), behind the scenes some transformation will take place, so the classes will be unique per component

function MainNavigation() {
	const favoritesCtx = useContext(FavoritesContext);

	return (
		<header className={classes.header}>
			<div className={classes.logo}>React Meetups</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>All Meetups</Link>
					</li>
					<li>
						<Link to='/favourites'>
							Favourites{' '}
							<span className={classes.badge}>
								{favoritesCtx.totalFavorites}
							</span>
						</Link>
					</li>
					<li>
						<Link to='/new-meetup'>New Meetup</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;

// we import the 'Link' component because if we use an anchor element, when we click it we will make a request to the server, and we want to avoid that, since we don't need it (remember we are in a SPA) (the 'Link' component is based on an anchor but prevents the default behaviour of sending a request, and instead parses the url you want to go to, changes it in the browser url bar, so it doesn't send request but loads the appropriate component in the screen). (note that if we used an anchor element, it would still work in our local, since a request would be sent to our local server, and since the url would change, then the right components would be rendered, but still, we would have a redundant request.)
