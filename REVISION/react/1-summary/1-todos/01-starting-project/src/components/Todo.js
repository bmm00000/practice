import { useState } from 'react';

import Modal from './Modal';
import Backdrop from './Backdrop';

const Todo = (props) => {
	const [showModal, setShowModal] = useState(false);

	const showModalHandler = () => {
		setShowModal(true);
	};

	const hideModalHandler = () => {
		setShowModal(false);
	};

	return (
		<>
			<div className='card'>
				<h2>{props.text}</h2>
				<div className='actions'>
					<button className='btn' onClick={showModalHandler}>
						Delete
					</button>
				</div>
			</div>
			{showModal && <Backdrop onClick={hideModalHandler} />}
			{showModal && (
				<Modal onCancel={hideModalHandler} onConfirm={hideModalHandler} />
			)}
		</>
	);
};

export default Todo;
