import { createContext, useState } from 'react';

// 'createContext' will return an object that will contain a React component, that's why we name it in capital letter. 'createContext' takes an argument: the initial values for the context, as follows:
const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (favoriteMeetup) => {},
	removeFavorite: (meetupId) => {},
	itemIsFavorite: (meetupId) => {},
});

// we also need ways to add or remove values from the context, that's why we use the following component. This component will also provide this context to other components that need values from the context, and will also be responsible for updating the context values (through 'useState'). This component has to be wrapped around all the components that need the values from the context, that's why we use 'props.children':
export function FavoritesContextProvider(props) {
	const [userFavorites, setUserFavorites] = useState([]);

	function addFavoriteHandler(favoriteMeetup) {
		// setUserFavorites(userFavorites.concat(favoriteMeetup));
		// 'concat' is like 'push', but it returns a new array.
		// however, we shouldn't do it like this, because React does not process state updates instantly, but schedules them behind the scenes. Therefore, there is a scenario where the last state update has not been processed yet. There is a better way to update state (you pass a function that will be executed for you by React; that function will receive the previous state snapshot, and will return the updated state; this guarantees that we have the latest state snapshot, since React executes this instantly):
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.concat(favoriteMeetup);
		});
	}

	function removeFavoriteHandler(meetupId) {
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
		});
	}

	function itemIsFavoriteHandler(meetupId) {
		return userFavorites.some((meetup) => meetup.id === meetupId);
	}

	const context = {
		favorites: userFavorites,
		totalFavorites: userFavorites.length,
		addFavorite: addFavoriteHandler,
		removeFavorite: removeFavoriteHandler,
		itemIsFavorite: itemIsFavoriteHandler,
	};
	// we are also adding the functions in the 'context' object, because we want to be able to modify the context values from different components, thus we need to access the functions from different components. We also add empty functions in the initial 'context', since this will help us with the autocomplettion in the IDE later.

	return (
		<FavoritesContext.Provider value={context}>
			{props.children}
		</FavoritesContext.Provider>
	);
}

export default FavoritesContext;
