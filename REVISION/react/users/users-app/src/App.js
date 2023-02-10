import { useState } from 'react';
import { createPortal } from 'react-dom';

import InputUser from './components/InputUser';
import UserList from './components/UserList';
import Modal from './components/ui/Modal';
import Backdrop from './components/ui/Backdrop';

function App() {
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState('');

	const addUserHandler = (user) => {
		if (user.name.trim().length === 0 || user.age.trim().length === 0) {
			setErrorMessage('You should not leave inputs empty');
		} else if (user.age < 0) {
			setErrorMessage('You should not enter negative age');
		} else {
			setErrorMessage('');
			setUsers((existingUsers) => [...existingUsers, user]);
		}
	};

	return (
		<>
			<h1>Our users app</h1>
			<InputUser onAddUser={addUserHandler} />
			<UserList users={users} />
			{errorMessage &&
				createPortal(<Backdrop />, document.getElementById('backdrop'))}
			{errorMessage &&
				createPortal(
					<Modal errorMessage={errorMessage} />,
					document.getElementById('modal')
				)}
		</>
	);
}

export default App;
