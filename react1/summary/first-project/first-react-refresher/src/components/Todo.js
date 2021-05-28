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
				<h2>{props.title}</h2>
				<div className='actions'>
					<button className='btn' onClick={openModalHandler}>
						Delete
					</button>
				</div>
			</div>
			{/* {modalIsOpen ? <Modal/> : null} */}
			{/* the same expression as above, refactored (if both conditions are true, the second value will be returned): */}
			{modalIsOpen && (
				<Modal onCancel={closeModalHandler} onAccept={closeModalHandler} />
			)}
			{modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
		</div>
	);
}

export default Todo;
