import './Card.css';

const Card = (props) => {
	const classes = 'card ' + props.className;
	// since we are not in the return block, 'props.className' doesn't have to be evaluated, ie. put inside {}

	return <div className={classes}>{props.children}</div>;
};

export default Card;
