import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
// only imports an object with the classes (as properties) from this css file, and you can apply them in the JSX below:

function MainNavigation() {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>React Meetups</div>
			<nav>
				<ul>
					<li>
						<Link to='/'>All Meetups</Link>
					</li>
					<li>
						<Link to='/favourites'>Favourites</Link>
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

// we import the 'Link' component because if we use a an anchor element, when we click it we will make a request, and we want to avoid that (the 'Link' component is based on an anchor but prevents the default behaviour of sending a request)
