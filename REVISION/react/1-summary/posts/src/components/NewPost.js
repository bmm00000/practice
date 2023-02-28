import { useRef } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onAdd, onClose }) {
	const bodyInputRef = useRef();
	const nameInputRef = useRef();

	const submitFormHandler = (event) => {
		event.preventDefault();

		const post = {
			id: Math.random().toString(),
			author: nameInputRef.current.value,
			text: bodyInputRef.current.value,
		};

		onAdd(post);
	};

	return (
		<form className={classes.form} onSubmit={submitFormHandler}>
			<p>
				<label htmlFor='body'>Text</label>
				<textarea id='body' required rows={3} ref={bodyInputRef} />
			</p>
			<p>
				<label htmlFor='name'>Your name</label>
				<input type='text' id='name' required ref={nameInputRef} />
			</p>
			<p className={classes.actions}>
				<button type='button' onClick={onClose}>
					Close
				</button>
				<button>Add</button>
			</p>
		</form>
	);
}

export default NewPost;
