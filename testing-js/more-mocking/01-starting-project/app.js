import { extractPostData, savePost } from './posts/posts.js';

const formElement = document.querySelector('form');

export async function submitFormHandler(event) {
	event.preventDefault();

	const formData = new FormData(formElement);
	// this is an object of type FormData (the browser's built-in FormData class)
	try {
		const postData = extractPostData(formData);
		await savePost(postData);
	} catch (error) {
		showError(error.message);
	}
}

formElement.addEventListener('submit', submitFormHandler);
