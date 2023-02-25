import { useState } from 'react';
import MainHeader from './components/MainHeader';
import Modal from './components/Modal';
import NewPost from './components/NewPost';
import PostsList from './components/PostsList';

function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [posts, setPosts] = useState([]);

	const openModalHandler = () => {
		setModalIsVisible(true);
	};

	const closeModalHandler = () => {
		setModalIsVisible(false);
	};

	const addPostHandler = (post) => {
		setPosts((existingPosts) => [post, ...existingPosts]);
		setModalIsVisible(false);
	};

	return (
		<>
			<MainHeader onCreatePost={openModalHandler} />
			<main>
				{modalIsVisible && (
					<Modal onClose={closeModalHandler}>
						<NewPost onAdd={addPostHandler} onClose={closeModalHandler} />
					</Modal>
				)}
				{posts.length === 0 && (
					<div style={{ textAlign: 'center', color: 'white' }}>
						<h2>No posts yet</h2>
						<p>Start adding some?</p>
					</div>
				)}
				{posts.length > 0 && <PostsList posts={posts} />}
			</main>
		</>
	);
}

export default App;
