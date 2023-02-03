import Post from './Post';
import classes from './PostList.module.css';

const PostList = ({ posts }) => {
	const content = posts.map((post) => (
		<Post author={post.author} text={post.text} />
	));

	return <ul className={classes.posts}>{content}</ul>;
};

export default PostList;
