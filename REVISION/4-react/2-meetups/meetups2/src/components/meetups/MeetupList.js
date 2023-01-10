import MeetupItem from './MeetupItem';

const MeetupList = (props) => {
	return (
		<>
			{props.meetups.map((meetup) => (
				<MeetupItem key={meetup.id} name={meetup.name} />
			))}
		</>
	);
};

export default MeetupList;
