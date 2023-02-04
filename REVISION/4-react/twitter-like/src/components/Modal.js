import classes from './Modal.module.css';

const Modal = ({ children, onHide }) => {
	return (
		<>
			<div className={classes.backdrop} onClick={onHide} />
			<dialog className={classes.modal} open>
				{children}
			</dialog>
		</>
	);
};

export default Modal;
