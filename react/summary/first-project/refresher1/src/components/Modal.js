function Modal(props) {
	function onAcceptHandler() {
		props.onAccept();
	}

	function onCancelHandler() {
		props.onCancel();
	}

	return (
		<div className='modal'>
			<p>Are you sure?</p>
			<button className='btn btn-alt' onClick={onAcceptHandler}>
				Accept
			</button>
			<button className='btn' onClick={onCancelHandler}>
				Cancel
			</button>
		</div>
	);
}

export default Modal;
