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
			{modalIsVisible && (
				<Modal onClose={closeModalHandler}>
					<NewPost onAdd={addPostHandler} />
				</Modal>
			)}
			<PostsList posts={posts} />
		</>
	);
}

export default App;
