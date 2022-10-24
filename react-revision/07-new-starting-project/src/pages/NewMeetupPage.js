import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	const history = useHistory();

	function addMeetupHandler(meetup) {
		fetch(
			'https://react-revision-60fb2-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
			{
				method: 'POST',
				body: JSON.stringify(meetup),
				headers: { 'Content-Type': 'application/data' },
			}
		).then((res) => {
			history.replace('/');
		});
	}

	return (
		<section>
			<h1>Add new meetup</h1>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</section>
	);
}

export default NewMeetupPage;
