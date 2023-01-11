import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
	const history = useHistory();

	const meetupSubmitHandler = (meetup) => {
		fetch(
			'https://meetups2-a84e5-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
			{
				method: 'POST',
				body: JSON.stringify(meetup),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		).then(() => {
			history.replace('/');
		});
	};

	return (
		<>
			<h2>Add a new meetup here</h2>
			<NewMeetupForm onSubmit={meetupSubmitHandler} />
		</>
	);
};

export default NewMeetup;
