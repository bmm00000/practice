import { useRef } from 'react';

import Card from '../ui/Card';

import classes from './NewMeetupForm.module.css';

const NewMeetupForm = (props) => {
	const titleInputRef = useRef();
	const imageInputRef = useRef();
	const addressInputRef = useRef();
	const descriptionInputRef = useRef();

	const submitFormHandler = (event) => {
		event.preventDefault();

		const title = titleInputRef.current.value;
		const image = imageInputRef.current.value;
		const address = addressInputRef.current.value;
		const description = descriptionInputRef.current.value;

		const newMeetup = {
			title,
			image,
			address,
			description,
		};

		props.onFormSubmit(newMeetup);
	};

	return (
		<Card>
			<form className={classes.form} onSubmit={submitFormHandler}>
				<div className={classes.control}>
					<label htmlFor='title'>Title</label>
					<input type='text' id='title' ref={titleInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='image'>Image</label>
					<input type='url' id='image' ref={imageInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='address'>Address</label>
					<input type='text' id='address' ref={addressInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						cols='30'
						rows='10'
						ref={descriptionInputRef}
					></textarea>
				</div>
				<div className={classes.actions}>
					<button>Submit</button>
				</div>
			</form>
		</Card>
	);
};

export default NewMeetupForm;
