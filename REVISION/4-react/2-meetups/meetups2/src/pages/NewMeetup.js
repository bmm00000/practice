import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
	const meetupSubmitHandler = (meetup) => {};

	return (
		<>
			<h2>Add a new meetup here</h2>
			<NewMeetupForm onSubmit={meetupSubmitHandler} />
		</>
	);
};

export default NewMeetup;
