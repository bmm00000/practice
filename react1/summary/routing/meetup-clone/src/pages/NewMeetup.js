import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	function addMeetupHandler(meetupData) {
		fetch(
			'https://react1-5c141-default-rtdb.europe-west1.firebasedatabase.app/meetups.json'
		);
	}

	return (
		<section>
			<h1>Add New Meetup</h1>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</section>
	);
}

export default NewMeetupPage;
