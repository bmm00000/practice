import { useHistory } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetupPage = (props) => {
	const history = useHistory();

	const submitMeetupHandler = (meetup) => {
		fetch(
			'https://meetups-app-42f83-default-rtdb.europe-west1.firebasedatabase.app/meetups.json',
			{
				method: 'POST',
				body: JSON.stringify(meetup),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log(data);
				history.replace('/');
			});
	};

	return (
		<section>
			<h1>Submit your meetup</h1>
			<NewMeetupForm onFormSubmit={submitMeetupHandler} />
		</section>
	);
};

export default NewMeetupPage;
