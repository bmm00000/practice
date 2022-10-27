import { createContext, useState } from 'react';

const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (item) => {},
	removeFavorite: (itemId) => {},
	isFavorite: (itemId) => {},
});

export function FavoritesContextProvider(props) {
	const [userFavorites, setUserFavorites] = useState([]);

	function addToFavoritesHandler(meetup) {
		setUserFavorites((prevUserFavorites) => prevUserFavorites.concat(meetup));
	}

	function removeFromFavoritesHandler(meetupId) {
		setUserFavorites((prevUserFavorites) =>
			prevUserFavorites.filter((meetup) => meetup.id !== meetupId)
		);
	}

	function meetupIsFavoriteHandler(meetupId) {
		return userFavorites.some((meetup) => meetup.id === meetupId);
	}

	const context = {
		favorites: userFavorites,
		totalFavorites: userFavorites.length,
		addFavorite: addToFavoritesHandler,
		removeFavorite: removeFromFavoritesHandler,
		isFavorite: meetupIsFavoriteHandler,
	};

	return (
		<FavoritesContext.Provider value={context}>
			{props.children}
		</FavoritesContext.Provider>
	);
}

export default FavoritesContext;
