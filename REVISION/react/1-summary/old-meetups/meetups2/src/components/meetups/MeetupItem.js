import { useContext } from 'react';

import FavoritesContext from '../../store/favorites-context';

const MeetupItem = (props) => {
	const favoritesCtx = useContext(FavoritesContext);

	const isFavorite = favoritesCtx.isFavorite(props.id);

	const toggleFavoriteHandler = () => {
		if (isFavorite) {
			favoritesCtx.removeFavorite(props.id);
		} else {
			favoritesCtx.addFavorite({ id: props.id, name: props.name });
		}
	};

	return (
		<>
			<li>{props.name}</li>
			<button onClick={toggleFavoriteHandler}>
				{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
		</>
	);
};

export default MeetupItem;
