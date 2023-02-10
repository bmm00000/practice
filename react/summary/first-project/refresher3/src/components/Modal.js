function Modal(props) {
	function acceptHandler() {
		props.onAccept();
	}

	function cancelHandler() {
		props.onCancel();
	}

	return (
		<div className='modal'>
			<p>Are you sure?</p>
			<button className='btn' onClick={acceptHandler}>
				Accept
			</button>
			<button className='btn' onClick={cancelHandler}>
				Cancel
			</button>
		</div>
	);
}

export default Modal;
