import { useRef } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onHide, onAddPost }) {
	const textInputRef = useRef();
	const nameInputRef = useRef();

	const submitPostHandler = (event) => {
		event.preventDefault();

		const post = {
			text: textInputRef.current.value,
			author: nameInputRef.current.value,
		};

		fetch('http://localhost:8080/posts', {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data));

		onAddPost(post);
		onHide();
	};

	return (
		<form className={classes.form} onSubmit={submitPostHandler}>
			<p>
				<label htmlFor='body'>Text</label>
				<textarea id='body' required rows={3} ref={textInputRef} />
			</p>
			<p>
				<label htmlFor='name'>Your name</label>
				<input type='text' id='name' required ref={nameInputRef} />
			</p>
			<p className={classes.actions}>
				<button type='button' onClick={onHide}>
					Cancel
				</button>
				<button>Submit</button>
			</p>
		</form>
	);
}

export default NewPost;
