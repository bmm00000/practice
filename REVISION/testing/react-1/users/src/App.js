import { useState } from 'react';

import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
	const [users, setUsers] = useState([]);

	const addUserHandler = (newUser) => {
		setUsers((existingUsers) => [...existingUsers, newUser]);
	};

	return (
		<>
			<UserForm onAddUser={addUserHandler} />
			<UserList users={users} />
		</>
	);
}

export default App;
