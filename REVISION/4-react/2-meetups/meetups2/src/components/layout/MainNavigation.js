import { Link } from 'react-router-dom';

const MainNavigation = () => {
	return (
		<>
			<h1>My Meetups App!</h1>
			<ul>
				<li>
					<Link to='/'>All meetups</Link>
				</li>
				<li>
					<Link to='/favorites'>Favorites</Link>
				</li>
				<li>
					<Link to='/new'>Add new meetup</Link>
				</li>
			</ul>
		</>
	);
};

export default MainNavigation;
