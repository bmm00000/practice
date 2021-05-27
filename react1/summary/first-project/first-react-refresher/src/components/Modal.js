function Modal(props) {
	function cancelHandler() {
		props.onCancel();
	}

	function acceptHandler() {
		props.onAccept();
	}

	return (
		<div className='modal'>
			<p>Are you sure?</p>
			<button className='btn btn--alt' onClick={cancelHandler}>
				Cancel
			</button>
			<button className='btn' onClick={acceptHandler}>
				Accept
			</button>
		</div>
	);
}

export default Modal;
