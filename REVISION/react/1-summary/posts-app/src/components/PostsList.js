import Post from './Post';
import classes from './PostsList.module.css';

const PostsList = ({ posts }) => {
	const postItems = posts.map((post) => (
		<Post key={post.id} author={post.author} text={post.text} />
	));

	return <ul className={classes.posts}>{postItems}</ul>;
};

export default PostsList;
