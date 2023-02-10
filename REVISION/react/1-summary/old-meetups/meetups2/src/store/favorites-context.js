import { useState, createContext } from 'react';

const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (meetup) => {},
	removeFavorite: (meetupId) => {},
	isFavorite: (meetupId) => {},
});

export const FavoritesContextProvider = (props) => {
	const [favorites, setFavorites] = useState([]);

	const addFavoriteHandler = (meetup) => {
		setFavorites((existingFaves) => existingFaves.concat(meetup));
	};

	const removeFavoriteHandler = (meetupId) => {
		setFavorites((existingFaves) =>
			existingFaves.filter((fave) => fave.id !== meetupId)
		);
	};

	const isFavoriteHandler = (meetupId) =>
		favorites.some((fave) => fave.id === meetupId);

	const context = {
		favorites,
		totalFavorites: favorites.length,
		addFavorite: addFavoriteHandler,
		removeFavorite: removeFavoriteHandler,
		isFavorite: isFavoriteHandler,
	};

	return (
		<FavoritesContext.Provider value={context}>
			{props.children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesContext;
