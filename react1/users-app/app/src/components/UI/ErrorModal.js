import Card from './Card';
import Button from '../UI/Button';
import classes from './ErrorModal.module.css';
import React from 'react';

const ErrorModal = (props) => {
	return (
		<React.Fragment>
			<div className={classes.backdrop} onClick={props.onConfirm} />
			<Card className={classes.modal}>
				<header className={classes.header}>
					<h2>{props.title}</h2>
				</header>
				<div className={classes.content}>
					<p>{props.message}</p>
				</div>
				<footer className={classes.actions}>
					<Button onClick={props.onConfirm}>Ok</Button>
				</footer>
			</Card>
		</React.Fragment>
	);
};

export default ErrorModal;

// if you inspect in the browser, you will see that the modal is rendered next to the input form (at the same level), this is semantically incorrect, since the modal should refer to the whole page. in order to make it semantically correct, you may want to have the backdrop and modal as direct childs of the body, next to the 'root' div that holds the rest of our app.
// portals need two things: you need a place you want to port the component to, and then you need to let the component know that it should have a portal to that place => you add divs with ids in the html file (you can add different such roots for different kinds of components that should be portaled there, or you can just add an id='overlay-root' which will hold all sorts of overlays, not only modals, but also side-drawers, etc.)
