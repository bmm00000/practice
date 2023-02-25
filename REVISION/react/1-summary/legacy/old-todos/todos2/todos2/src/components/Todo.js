import { useState } from 'react';

import Backdrop from './Backdrop';
import Modal from './Modal';

const Todo = (props) => {
	const [showModal, setShowModal] = useState(false);

	const showModalHandler = () => {
		setShowModal(true);
	};

	const hideModalHandler = () => {
		setShowModal(false);
	};

	return (
		<div>
			<h2>{props.text}</h2>
			<button onClick={showModalHandler}>Delete</button>
			{showModal && <Backdrop onClick={hideModalHandler} />}
			{showModal && (
				<Modal
					text={props.text}
					onConfirm={hideModalHandler}
					onCancel={hideModalHandler}
				/>
			)}
		</div>
	);
};

export default Todo;
