import classes from './Post.module.css';

const Post = ({ author, text }) => {
	return (
		<li className={classes.post}>
			<p className={classes.text}>{text}</p>
			<p className={classes.author}>{author}</p>
		</li>
	);
};

export default Post;
