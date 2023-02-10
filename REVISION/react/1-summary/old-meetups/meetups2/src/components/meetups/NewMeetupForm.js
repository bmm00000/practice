import { useRef } from 'react';

const NewMeetupForm = (props) => {
	const nameInputRef = useRef();

	const submitMeetupHandler = (event) => {
		event.preventDefault();

		const newMeetup = { name: nameInputRef.current.value };

		props.onSubmit(newMeetup);
	};

	return (
		<form onSubmit={submitMeetupHandler}>
			<label htmlFor='name'>Meetup name:</label>
			<input type='text' id='name' ref={nameInputRef} />
			<button>Submit</button>
		</form>
	);
};

export default NewMeetupForm;
