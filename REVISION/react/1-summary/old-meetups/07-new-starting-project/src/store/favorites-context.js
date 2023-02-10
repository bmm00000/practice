import { createContext, useState } from 'react';

const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (meetup) => {},
	removeFavorite: (meetupId) => {},
	isFavorite: (meetupId) => {},
});

export const FavoritesContextProvider = (props) => {
	const [faves, setFaves] = useState([]);

	const addFaveHandler = (newMeetup) => {
		setFaves((oldFaves) => oldFaves.concat(newMeetup));
	};

	const removeFaveHandler = (meetupId) => {
		setFaves((oldFaves) =>
			oldFaves.filter((oldMeetup) => oldMeetup.id !== meetupId)
		);
	};

	const isFaveHandler = (meetupId) => {
		return faves.some((meetup) => meetup.id === meetupId);
	};

	const context = {
		favorites: faves,
		totalFavorites: faves.length,
		addFavorite: addFaveHandler,
		removeFavorite: removeFaveHandler,
		isFavorite: isFaveHandler,
	};

	return (
		<FavoritesContext.Provider value={context}>
			{props.children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesContext;
