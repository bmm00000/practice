import { useContext } from 'react';

import FavoritesContext from '../store/favorites.context';
import MeetupList from '../components/meetups/MeetupList';

function FavouritesPage() {
	const favoritesCtx = useContext(FavoritesContext);

	let content;

	if (favoritesCtx.totalFavorites === 0) {
		content = <p>You've got no favorites. Add some?</p>;
		// it looks strange to store jsx in in variable, but you can use jsx anywhere where a value is needed (eg. arrays, return statements, variables, etc.)
	} else {
		content = <MeetupList meetups={favoritesCtx.favorites} />;
	}

	return (
		<section>
			<h1>My Favorites</h1>
			{content}
		</section>
	);
}

export default FavouritesPage;

// the only problem is that if you reload the Favorites page, the content is lost, because context is only stored in memory (in the browser?), not permanently. if want to store it permanently, you would need to use some browser storage in the FavoritesContextProvider, or store it on a server (as we do with our AllMeetupsPage). this is something you can do to enhance this application.
