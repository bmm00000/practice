import { useState, useEffect } from 'react';
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import Modal from './components/Modal';
import MainHeader from './components/MainHeader';

function App() {
	const [posts, setPosts] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchPosts = async () => {
			const fetchedData = await fetch('http://localhost:8080/posts');
			const fetchedPosts = await fetchedData.json();
			setPosts(fetchedPosts.posts);
			setIsLoading(false);
		};
		fetchPosts();
		// fetch('http://localhost:8080/posts')
		// 	.then((response) => response.json())
		// 	.then((data) => setPosts(data.posts));
	}, []);

	const addPostHandler = (post) => {
		setPosts((existingPosts) => [post, ...existingPosts]);
	};

	const showModalHandler = () => {
		setShowModal(true);
	};

	const hideModalHandler = () => {
		setShowModal(false);
	};

	return (
		<>
			<MainHeader onCreatePost={showModalHandler} />
			<main>
				{isLoading && (
					<div style={{ textAlign: 'center' }}>
						<p>Loading...</p>
					</div>
				)}
				{!isLoading && showModal && (
					<Modal onHide={hideModalHandler}>
						<NewPost onAddPost={addPostHandler} onHide={hideModalHandler} />
					</Modal>
				)}
				{!isLoading && posts.length > 0 && <PostList posts={posts} />}
				{!isLoading && posts.length === 0 && (
					<div style={{ textAlign: 'center' }}>
						<h2>There are no posts yet</h2>
						<p>Start adding some!</p>
					</div>
				)}
			</main>
		</>
	);
}

export default App;
