import { useState, useEffect } from 'react';
import MainHeader from './components/MainHeader';
import Modal from './components/Modal';
import NewPost from './components/NewPost';
import PostsList from './components/PostsList';

function App() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const response = await fetch('http://localhost:8080/posts');
			const parsedResponse = await response.json();
			setPosts(parsedResponse.posts);
			setLoading(false);
		};
		fetchPosts();
	}, []);

	const openModalHandler = () => {
		setModalIsOpen(true);
	};

	const closeModalHandler = () => {
		setModalIsOpen(false);
	};

	const addPostHandler = (post) => {
		fetch('http://localhost:8080/posts', {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		setPosts((existingPosts) => [post, ...existingPosts]);
		setModalIsOpen(false);
	};

	return (
		<>
			<MainHeader onCreatePost={openModalHandler} />
			<main>
				{!loading && modalIsOpen && (
					<Modal onClose={closeModalHandler}>
						<NewPost onAdd={addPostHandler} onClose={closeModalHandler} />
					</Modal>
				)}
				{loading && (
					<div style={{ textAlign: 'center', color: 'white' }}>
						<h2>Loading...</h2>
					</div>
				)}
				{!loading && posts.length === 0 && (
					<div style={{ textAlign: 'center', color: 'white' }}>
						<h2>No posts yet</h2>
						<p>Start adding some?</p>
					</div>
				)}
				{!loading && posts.length > 0 && <PostsList posts={posts} />}
			</main>
		</>
	);
}

export default App;
