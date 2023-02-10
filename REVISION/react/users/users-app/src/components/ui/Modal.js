import classes from './Modal.module.css';

const Modal = ({ errorMessage }) => {
	return (
		<>
			<div className={classes.modal}>
				<h3>We have an error here</h3>
				<p>{errorMessage}</p>
			</div>
		</>
	);
};

export default Modal;
