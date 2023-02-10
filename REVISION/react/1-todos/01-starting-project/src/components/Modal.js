const Modal = (props) => {
	const cancelHandler = () => {
		props.onCancel();
	};

	const confirmHandler = () => {
		props.onConfirm();
	};

	return (
		<div className='modal'>
			<h3>Are you sure you want to delete it?</h3>
			<div>
				<button className='btn btn--alt' onClick={cancelHandler}>
					Cancel
				</button>
				<button className='btn' onClick={confirmHandler}>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default Modal;
