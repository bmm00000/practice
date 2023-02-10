import { useContext } from 'react';
import FavoritesContext from '../store/favorites-context';

import MeetupList from '../components/meetups/MeetupList';

const FaveMeetupsPage = (props) => {
	const favoritesCtx = useContext(FavoritesContext);

	const faves = favoritesCtx.favorites;
	const totalFaves = favoritesCtx.totalFavorites;

	if (totalFaves === 0) {
		return (
			<section>
				<p>No fave meetups yet. Add some?</p>
			</section>
		);
	}

	return (
		<section>
			<h1>All Meetups</h1>
			<MeetupList meetups={faves} />
		</section>
	);
};

export default FaveMeetupsPage;
