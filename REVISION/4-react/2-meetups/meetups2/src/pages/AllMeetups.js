import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{ id: 'm1', name: 'first meetup' },
	{ id: 'm2', name: 'second meetup' },
];

const AllMeetups = (props) => {
	return (
		<>
			<h2>This is a list of all the meetups</h2>
			<MeetupList meetups={DUMMY_MEETUPS} />
		</>
	);
};

export default AllMeetups;
