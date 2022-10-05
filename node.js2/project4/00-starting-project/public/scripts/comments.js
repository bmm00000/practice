const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');
const titleInputElement = document.getElementById('title');
const textInputElement = document.getElementById('text');

function createCommentsListElement(comments) {
	const commentsListElement = document.createElement('ol');
	for (const comment of comments) {
		const commentElement = document.createElement('li');
		commentElement.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}</h2>
                <p>${comment.text}</p>
            </article>
        `;
		commentsListElement.appendChild(commentElement);
	}
	return commentsListElement;
}

async function getComments(event) {
	const postId = loadCommentsBtnElement.dataset.postid;

	try {
		const response = await fetch(`/posts/${postId}/comments`);

		if (!response.ok) {
			alert('Something went wrong in the server');
		}

		const responseData = await response.json();

		if (responseData && responseData.length !== 0) {
			const commentsListElement = createCommentsListElement(responseData);
			commentsSectionElement.innerHTML = '';
			commentsSectionElement.appendChild(commentsListElement);
		} else {
			commentsSectionElement.firstChild.textContent =
				'We have no comments. Add one?';
		}
	} catch (error) {
		alert('Something went wrong with your connection');
	}
}

async function saveFormData(event) {
	event.preventDefault();
	const postId = commentsFormElement.dataset.postid;

	const enteredTitle = titleInputElement.value;
	const enteredText = textInputElement.value;
	const comment = { title: enteredTitle, text: enteredText };

	try {
		const response = await fetch(`/posts/${postId}/comments`, {
			method: 'POST',
			body: JSON.stringify(comment),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			alert('Something went wrong with the server');
		}

		getComments();
	} catch (error) {
		alert('Something went wrong with your connection');
	}
}

loadCommentsBtnElement.addEventListener('click', getComments);
commentsFormElement.addEventListener('submit', saveFormData);
