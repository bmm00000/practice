import { createContext, useState } from 'react';
// 'createContext' is a function exposed by the react library

// 'createContext' will return a js object that will contain a React component, that's why we name it in capital letter. 'createContext' takes an argument: the initial values for the context, ie. the initial state of the application wide state, as follows (in our case, it's an object, but it could be anything):
const FavoritesContext = createContext({
	favorites: [],
	totalFavorites: 0,
	addFavorite: (favoriteMeetup) => {},
	removeFavorite: (meetupId) => {},
	itemIsFavorite: (meetupId) => {},
	// we add empty functions here in the initial context because it will give us better autocompletion in the IDE later
});

// we also need ways to add or remove values from the context (ie. ways of changing the state), that's why we use the following component. This component is a regular react component that will also provide this context to other components that need values from the context, and will also be responsible for updating the context values (through 'useState'). This component has to be wrapped around all the components that need the values from the context, that's why we use 'props.children' (THEREFORE, THIS COMPONENT HAS TWO PURPOSES):
export function FavoritesContextProvider(props) {
	const [userFavorites, setUserFavorites] = useState([]);

	function addFavoriteHandler(favoriteMeetup) {
		// setUserFavorites(userFavorites.concat(favoriteMeetup));
		// 'concat' is like 'push', but it returns a new array.
		// however, we shouldn't do it like this, because React does not process state updates instantly, but schedules them for the future behind the scenes. Therefore, when your new state depends on your former state, there is a scenario where the last state update has not been processed yet, therefore your new state will be wrong. There is a better way to update state (you pass a function that will be executed for you by React; that function will receive the previous state snapshot, and will return the updated state; this guarantees that we have the latest state snapshot, since React executes this instantly):
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.concat(favoriteMeetup);
		});
	}

	function removeFavoriteHandler(meetupId) {
		setUserFavorites((prevUserFavorites) => {
			return prevUserFavorites.filter((meetup) => meetup.id !== meetupId);
			// 'filter' also returns a new array
		});
	}

	function itemIsFavoriteHandler(meetupId) {
		return userFavorites.some((meetup) => meetup.id === meetupId);
	}

	// these are the latest values that should be exposed to our components, and the functions to change them. we don't only want to access values from different components, but also we want to access functions to change those values from different components (watch out, below we don't execute the functions with '()', but we simple point at them to pass them).
	const context = {
		favorites: userFavorites,
		totalFavorites: userFavorites.length,
		addFavorite: addFavoriteHandler,
		removeFavorite: removeFavoriteHandler,
		itemIsFavorite: itemIsFavoriteHandler,
	};

	return (
		<FavoritesContext.Provider value={context}>
			{/* this component wants a 'value' prop where we pass the current context value. we set the initial values when we createContext, but we can then update those values and pass the latest values with the help of the 'value' prop, and when that value changes, all the components that are listening to our context will be updated.  */}
			{props.children}
		</FavoritesContext.Provider>
		// 'FavoritesContext.Provider' is the component that 'FavoritesContext' has built-in (the component we were talking about above). this component has to be wrapped around all the components that are interested in interacting with that context. This means that this 'FavoritesContextProvider' will be wrapped around other components later (in our case, we will use it in index.js to wrap it around our whole app, so all the components in the app have access to the context.)

		// we are building it like this because now in this 'FavoritesContextProvider' component we can manage our context data with state (this component is a regular react component so we can useState as usual), so when we update state, this component will execute again and the new state will be be passed to all the components that are listening to the context
	);
}

export default FavoritesContext;

// we have two exports, because we will need to interact with these two objects outside this file.

// NOW WE NEED TO MANAGE STATE THAT AFFECTS MORE THAN ONE COMPONENT: if we have a meetup in our 'favorites' page, then the button in the 'all meetups' page will be different, and also we will have a badge in the navigation bar that indicates how many 'favorites' we have.
// THAT'S WHY WE NEED A MECHANISM TO MANAGE THAT STATE GLOBALLY AND DISTRIBUTE THAT STATE TO DIFFERENT COMPONENTS: using useState inside of a single component doesn't do the trick anymore. one thing we could do is to lift our state up (manage our 'favorites' state is app.js and then we pass it as props into the components that are interested in that state). however, this approach has two drawbacks: if we have a big application with different states that affect different components, have to manage more and more states in the App component and it would become more and more complex; the other problem is that if we distribute state through props, we would end up with very long prop chains. this is not too bad, but it's not that great, since it can make the code harder to maintain.
// because we have problems like this, there are state management solutions to manage application wide state in a more convenient way, for example Redux, but for many scenarios we don't even need Redux, because React has aleady built-in a state management solution for application wide state: that's a feature called 'context'. in order to add this 'context' feature, we create the 'store' folder (the name 'store' is a common convention, since we will set up the state store for this application)
