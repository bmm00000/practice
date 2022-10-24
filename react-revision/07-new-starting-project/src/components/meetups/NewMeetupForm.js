import { useRef } from 'react';

import Card from '../ui/Card';

import classes from './NewMeetupForm.module.css';

function NewMeetupForm(props) {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();

	function submitHandler(event) {
		event.preventDefault();

		const enteredTitle = titleInputRef.current.value;
		const enteredImage = imageInputRef.current.value;
		const enteredAddress = addressInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;

		const meetupData = {
			title: enteredTitle,
			image: enteredImage,
			address: enteredAddress,
			description: enteredDescription,
		};

		props.onAddMeetup(meetupData);
	}

	return (
		<Card>
			<form action='' onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Title</label>
					<input type='text' id='title' required ref={titleInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='image'>Image</label>
					<input type='url' id='image' required ref={imageInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='address'>Address</label>
					<input type='text' id='address' required ref={addressInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						id='description'
						rows='5'
						ref={descriptionInputRef}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button type='submit'>Add meetup</button>
				</div>
			</form>
		</Card>
	);
}

export default NewMeetupForm;
