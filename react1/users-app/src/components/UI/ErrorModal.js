import classes from './ErrorModal.module.css';

const ErrorModal = () => {
	return (
		<div className={classes.backdrop}>
			<div className={classes.modal}>
				<div className={classes.header}>
					<h2>Error!</h2>
				</div>
			</div>
		</div>
	);
};

export default ErrorModal;
