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
			{/* working with 'event props' (passing functions as props): we do this to close the modal, because we cannot use the built-in prop 'onClick' in a custom component (we only have a few built-in props in custom components, as we will see later ). that's why we need to pass the function, so we can access the JSX built-in component, so we can use the built-in prop 'onClick' there. (we can pass functions as props because in JS functions are first class objects, and we can pass them around as values, as we do with strings, numbers, etc.) */}
		</div>
	);
}

export default Todo;
