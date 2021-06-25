import { useState } from 'react';
import Modal from './Modal';
import Backdrop from './Backdrop';

function Todo(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function openModalHandler() {
		setModalIsOpen(true);
	}

	function closeModalHandler() {
		setModalIsOpen(false);
	}

	return (
		<div>
			<div className='card'>
				<h4>{props.title}</h4>
				<div className='actions'>
					<button className='btn' onClick={openModalHandler}>
						Delete
					</button>
				</div>
			</div>
			{modalIsOpen && (
				<Modal onAccept={closeModalHandler} onCancel={closeModalHandler} />
			)}
			{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
		</div>
	);
}

export default Todo;
