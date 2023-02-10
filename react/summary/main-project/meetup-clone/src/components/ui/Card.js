import classes from './Card.module.css';

function Card(props) {
	return <div className={classes.card}>{props.children}</div>;
}

export default Card;

// in this 'ui' folder, we have general ui components that are not associated to any specific feature, but are stylistic elements that we want to associate to different parts of our app, that's why we have a separate folder for them (these are wrapper components, implemented with props.children)
