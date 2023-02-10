import { useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';

function Todo(props) {
	const [showModal, setShowModal] = useState(false);

	function showModalHandler() {
		setShowModal(true);
	}

	function hideModalHandler() {
		setShowModal(false);
	}

	return (
		<div>
			<div className='card'>
				<h1>{props.title}</h1>
				<button className='btn' onClick={showModalHandler}>
					Delete
				</button>
			</div>
			{showModal && (
				<Modal onAccept={hideModalHandler} onCancel={hideModalHandler} />
			)}
			{showModal && <Backdrop onCancel={hideModalHandler} />}
		</div>
	);
}

export default Todo;
