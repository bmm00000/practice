import { useState } from 'react';

import Modal from './Modal';
import Backdrop from './Backdrop';

function Todo({ text }) {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function toggleModalHandler() {
		setModalIsOpen((modalIsOpen) => !modalIsOpen);
	}

	return (
		<div className='card'>
			<h2>{text}</h2>
			<div className='actions'>
				<button className='btn' onClick={toggleModalHandler}>
					Delete
				</button>
			</div>
			{modalIsOpen && (
				<Modal onConfirm={toggleModalHandler} onCancel={toggleModalHandler} />
			)}
			{modalIsOpen && <Backdrop onCancel={toggleModalHandler} />}
		</div>
	);
}

export default Todo;
