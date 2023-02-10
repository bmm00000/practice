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

const AllMeetupsPage = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [meetups, setMeetups] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://meetups-app-42f83-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const fetchedMeetups = [];
				for (let id in data) {
					const meetup = {
						id,
						...data[id],
					};
					fetchedMeetups.push(meetup);
				}
				setIsLoading(false);
				setMeetups(fetchedMeetups);
			});
	}, []);

	if (isLoading) {
		return (
			<section>
				<p>Loading meetups...</p>
			</section>
		);
	}

	if (meetups.length === 0) {
		return (
			<section>
				<p>No meetups yet. Add some?</p>
			</section>
		);
	}

	return (
		<section>
			<h1>All Meetups</h1>
			<MeetupList meetups={meetups} />
		</section>
	);
};

export default AllMeetupsPage;
