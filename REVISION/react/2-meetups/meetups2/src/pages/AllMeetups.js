import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
// 	{ id: 'm1', name: 'first meetup' },
// 	{ id: 'm2', name: 'second meetup' },
// ];

const AllMeetups = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [meetups, setMeetups] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			'https://meetups2-a84e5-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		)
			.then((response) => response.json())
			.then((data) => {
				const fetchedMeetups = [];
				for (let key in data) {
					const meetup = {
						id: key,
						...data[key],
					};
					fetchedMeetups.push(meetup);
				}
				setMeetups(fetchedMeetups);
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	return (
		<>
			<h2>This is a list of all the meetups</h2>
			<MeetupList meetups={meetups} />
		</>
	);
};

export default AllMeetups;
