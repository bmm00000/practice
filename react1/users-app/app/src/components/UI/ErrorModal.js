import React from 'react';
import ReactDOM from 'react-dom';

import Card from './Card';
import Button from '../UI/Button';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
	// we want to tell react that the backdrop should be portaled somewhere. in order to do that, we create a new component, and we add it in this file, because in this app we only use the Backdrop component in conjunction with the modal (but you could put it in a different file, especially if you would need to use the Backdrop component in conjunction with other components as well):

	const Backdrop = (props) => {
		return <div className={classes.backdrop} onClick={props.onConfirm} />;
	};

	const ModalOverlay = (props) => {
		return (
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
		);
	};

	return (
		<React.Fragment>
			{ReactDOM.createPortal(
				<Backdrop onConfirm={props.onConfirm} />,
				document.getElementById('backdrop-root')
			)}
			{/* when calling the createPortal method, it takes two arguments: your react node that should be rendered, and a pointer (dom api provided by the browser) to the real dom where this container whould be rendered in. all and all, what we are doing is moving/portaling the html that is about to be rendered to a different place. as a result, no matter where you use the ErrorModal component (no matter how deeply nested it is in other elements), the Backdrop component will be always rendered where we specified. in the JSX code, we place the ErrorModal wherever we need (as nested as it can be), but the html code is rendered in a place that is semantically correct. therefore, instead of using the Backdrop in the JSX block, you use {ReactDOM.createPortal(<Backdrop.....)}, so you will decide where the final html will be rendered in the dom. as a result, the organization of the JSX doesn't change */}
			{ReactDOM.createPortal(
				<ModalOverlay
					title={props.title}
					message={props.message}
					onConfirm={props.onConfirm}
				/>,
				document.getElementById('overlay-root')
			)}
		</React.Fragment>
	);
};

export default ErrorModal;

// if you trigger the modal manually and inspect in the browser, you will see that the modal is rendered next to the input form (at the same level), this is semantically incorrect, since the modal should refer to the whole page. in order to make it semantically correct, you may want to have the modal as a direct child of the body, next to the 'root' div that holds the rest of our app. (you can try this out by dragging and dropping the dom elements when you inspect in the browser)
// portals need two things: you need a place you want to port the component to (we include a div in the html file), and then you need to let the component know that it should have a portal to that place => you add divs with ids in the html file (you can add different such roots for different kinds of components that should be portaled there, or you can just add an id='overlay-root' which will hold all sorts of overlays, not only modals, but also side-drawers, etc.)

// you can think of the 'react' library as having all the react features, and the 'react-dom' library uses the 'react' library to bring these features into the web browser (to make them compatible with the DOM) (in other words, the 'react' library doesn't have if you run it in an environment that has a dom, or if you would use it to build a native app, ie. you can use 'react native' in conjunction with 'react' to build a mobile app). therefore, 'react-dom' is the adaptor of 'react' to the browser.

// in summary, fragments and portals are two features that help us write cleaner html code (the app worked the same way before we added those features, but now our code is semantically better).
