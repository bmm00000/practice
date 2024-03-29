import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose} />;
};

const Overlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	);
};

const overlaysElement = document.getElementById('overlays');

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(
				<Backdrop onClose={props.onClose} />,
				overlaysElement
			)}
			{ReactDOM.createPortal(
				<Overlay>{props.children}</Overlay>,
				overlaysElement
			)}
		</Fragment>
	);
};

export default Modal;
