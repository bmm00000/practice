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
	const [meetups, setMeetups] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://react-revision-60fb2-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		)
			.then((response) => response.json())
			.then((data) => {
				const meetups = [];
				for (const key in data) {
					const meetup = {
						id: key,
						...data[key],
					};
					meetups.push(meetup);
				}
				setIsLoading(false);
				setMeetups(meetups);
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
			<MeetupList meetups={meetups} />
		</section>
	);
}

export default AllMeetupsPage;
