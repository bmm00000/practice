import classes from './Modal.module.css';

const Modal = (props) => {
	return (
		<div className={classes.modal}>
			<h2>Are you sure you want to delete {props.text}?</h2>
			{props.text}
			<button onClick={props.onConfirm}>Confirm</button>
			<button onClick={props.onCancel}>Cancel</button>
		</div>
	);
};

export default Modal;
