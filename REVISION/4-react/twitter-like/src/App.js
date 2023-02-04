import { useState } from 'react';
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import Modal from './components/Modal';
import MainHeader from './components/MainHeader';

function App() {
	const [posts, setPosts] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const addPostHandler = (post) => {
		setPosts((existingPosts) => [...existingPosts, post]);
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
				{showModal && (
					<Modal onHide={hideModalHandler}>
						<NewPost onAddPost={addPostHandler} onHide={hideModalHandler} />
					</Modal>
				)}
				{posts.length > 0 && <PostList posts={posts} />}
				{posts.length === 0 && (
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
