import { useNavigate } from 'react-router-dom';
import classes from './Modal.module.css';

const Modal = ({ children }) => {
	const navigate = useNavigate();

	const onHide = () => {
		navigate('..');
	};

	return (
		<>
			<div className={classes.backdrop} onClick={onHide} />
			<dialog className={classes.modal} open>
				{children}
			</dialog>
		</>
	);
};

export default Modal;
