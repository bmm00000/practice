import Backdrop from './Backdrop';
import Modal from './Modal';

const Todo = (props) => {
	return (
		<div>
			<h2>{props.text}</h2>
			<button>Delete</button>
			<Backdrop />
			<Modal text={props.text} />
		</div>
	);
};

export default Todo;
