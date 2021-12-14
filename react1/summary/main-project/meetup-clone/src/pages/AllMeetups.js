import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_DATA = [
// 	{
// 		id: 'm1',
// 		title: 'This is a first meetup',
// 		image:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
// 		address: 'Meetupstreet 5, 12345 Meetup City',
// 		description:
// 			'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
// 	},
// 	{
// 		id: 'm2',
// 		title: 'This is a second meetup',
// 		image:
// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
// 		address: 'Meetupstreet 5, 12345 Meetup City',
// 		description:
// 			'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
// 	},
// ];

function AllMeetupsPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedMeetups, setLoadedMeetups] = useState([]);

	// in order to load the meetups from the database, we want to make a GET request before anything else is rendered, that's why we could use 'fetch' here (we don't need the configuration object, since the default request of 'fetch' is a GET request, and we would get the 'response' object authomatically, since that's how 'fetch' works: it returns a promise which resolves to the actually response). however, this approach would generate an infinite loop (requests and updating state, and request again, etc.), and therefore spam our API:
	// fetch(
	// 	'https://react1-5c141-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
	// )
	// 	.then((response) => {
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		setIsLoading(false);
	// 		setLoadedMeetups(data)
	// 	});
	// this situation is so common that React has a solution as a hook (remember, a hook is a built-in function provided by the react library that solves a common problem): 'useEffect' (it allows you to run certain code from the component ('side effects', ie. code that does not directly reflect what will show up on the screen) under certain conditions, not alwayws. At the moment, 'fetch' is called ALWAYS when the component function runs. with useEffect we will restrict this and define conditions that determine WHEN it should run, so it does NOT ALWAYS run. the first argument of useEffect is a function, and the second argument is an array of dependencies. under what conditions will react execute the function of the first argument? the second argument is not required, but if you don't include it (the dependencies array), then the code of the callback in useEffect will be run every time the component is run, so you won't gain anything from useEffect). in your dependencies array, you should include all the external values that your function relies on (dependencies). if these values changed from when the useEffect function was executed the last time, then the useEffect function will run. if the dependecies array is empty, then it will be executed only the first time the component is rendered. in short, the function only runs again if your dependencies change!! in your dependencies array, you should include all the external values that your function relies on (dependencies). these are any props or state values that our useEffect function needs from outside in order to be run (state updating functions, such as 'setIsLoading', are an exception, it would be technically correct if you included them in the dependencies array (since they are external dependencies), but React guarantees that state updating functions will not change, so you don't need to include them in the dependencies array). since we don't have any external dependencies, our dependencies array is empty, as follows:
	useEffect(() => {
		// whenever this side effect is running, we setIsLoading to 'true' again; it will not execute it again in our case, so we wouldn't need this, but it's cleaner like this:
		setIsLoading(true);
		fetch(
			'https://react1-5c141-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// Firebase sends not an array but an object (with autogenerated ids as properties, and nested inside of these properties we get objects with the actual meetup data), but we need an array to map, therefore we do the following:
				const meetups = [];

				for (let key in data) {
					const meetup = {
						id: key,
						...data[key],
					};
					meetups.push(meetup);
				}

				setIsLoading(false);
				setLoadedMeetups(meetups);
			});
	}, []);

	if (isLoading) {
		return (
			<section>
				<p>Loading...</p>
			</section>
		);
	}

	return (
		<section>
			<h1>All meetups</h1>
			<MeetupList meetups={loadedMeetups} />
		</section>
	);
}

export default AllMeetupsPage;

// the .json() method comes built-in with the response from 'fetch', it converts JSON into a JS object, but it returns a promise, that's why we have to wait for the promise to resolve and use '.then' again (you add 'return' to response.json(), so another '.then' block will be able to get the promise when it resolves.)
// BUT  we have a problem: JS does not wait until the promise returned by 'fetch' gets resolved, therefore the data that we fetch will not be rendered when the component gets rendered first. how can we  solve this? if we used async await, it wouldn't work, since then the whole component would return a promise (that's what the keyword 'async' does), and react components have to be synchronous (cannot return a promise, they have to return directly JSX). Therefore, what we can do is to return something provisional until we get the data (some temporary jsx code, like a spinner), and then change what's rendered on the screen when we get the data: in order to change what's visible on the screen we use state.
