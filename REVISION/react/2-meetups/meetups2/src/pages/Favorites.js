import { useContext } from 'react';

import FavoritesContext from '../store/favorites-context';
import MeetupList from '../components/meetups/MeetupList';

const Favorites = () => {
	const favoritesCtx = useContext(FavoritesContext);

	let content;

	if (favoritesCtx.totalFavorites === 0) {
		content = <p>There are no favorites, add some?</p>;
	} else {
		content = <MeetupList meetups={favoritesCtx.favorites} />;
	}

	return (
		<>
			<h2>This is a list of the favorite meetups</h2>
			{content}
		</>
	);
};

export default Favorites;
