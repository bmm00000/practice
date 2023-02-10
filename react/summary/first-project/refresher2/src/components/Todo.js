import { useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';

function Todo(props) {
	const [modalOpen, setModalOpen] = useState(false);

	function openModalHandler() {
		setModalOpen(true);
	}

	function closeModalHandler() {
		setModalOpen(false);
	}

	return (
		<div>
			<div className='card'>
				<h2>{props.title}</h2>
				<div className='actions'>
					<button className='btn' onClick={openModalHandler}>
						Delete
					</button>
				</div>
			</div>
			{modalOpen && (
				<Modal onAccept={closeModalHandler} onCancel={closeModalHandler} />
			)}
			{modalOpen && <Backdrop onCancel={closeModalHandler} />}
		</div>
	);
}

export default Todo;
