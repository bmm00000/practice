// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader() {
	return (
		<header className={classes.header}>
			<nav>
				<ul>
					<li>
						<NavLink activeClassName={classes.active} to='/welcome'>
							Welcome
						</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classes.active} to='/products'>
							Products
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainHeader;

// if we inspect this links, we will see that an anchor tag is still
// rendered at the end by the Link component, but internally,
// react-router will listen to clicks on those links, prevent the
// browser default of sending an http request, update the url for us
// and change what we see on the screen.

// NavLink works the same as the Link component, only that it does more than that: it will also set a css class on the active anchor, we just need to tell NavLink what class to add (through the activeClassName prop)
