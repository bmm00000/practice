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

	// the following approach would generate unnecessary requests and spam our API:
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
	// this situation is so common that React has a solution: 'useEffect' (it allows you to run certain code from the component ('side effects', ie. code that does not directly reflect what will show up on the screen) under certain conditions, not alwayws. If you don't use the dependencies array, then the code of the callback in useEffect will be run every time the component is run, so you won't gain anything from useEffect). in your dependencies array, you should include all the external values that your function relies on (dependencies). if these values changed from when the useEffect code was executed the last time, then the useEffect function will run. if the dependecies array is empty, then it will be executed only the first time the component is rendered. in your dependencies array, you should include all the external values that your function relies on (dependencies). these are any props or state values that our useEffect function needs from outside in order to be run (state updating functions, such as 'setIsLoading', are an exception, it would be technically correct if you included them in the dependencies array, but React guarantees that state updating functions will not change, so you don't need to.). therefore, our dependencies array is empty, as follows:
	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://react1-5c141-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				// Firebase sends not an array but an object with the meetups nested as objects, but we need an array to map, therefore we do the following:
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

// arrays of JSX elements are rendered automatically by React, for example, when a component returns {[<li>Item1</li>, <li>Item2</li>, <li>Item3</li>]}, the JSX inside the array are rendered, no problem. That's why we use the built-in function map, to map arrays of objects into arrays of JSX elements, as we do in the dummy data above.

// the .json() method comes with the response from 'fetch', it converts JSON into JS, and it returns a promise, that's why we have to use '.then' again.
// BUT  we have a problem: JS does not wait until the promise returned by 'fetch' gets resolved, therefore the data that we fetch will not be rendered. how can we  solve this? if we used async await, it wouldn't work, since then the component would return a promise (that's what the keyword 'async' does), and react components have to be synchronous (cannot return a promise, they have to return directly JSX). Therefore, what we can do is to return something provisional until we get the data (like a spinner), and then change what's rendered on the screen, that's why we use 'useState'.
