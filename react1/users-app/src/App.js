import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
	const [usersList, setUsersList] = useState([]);

	const addUserHandler = (user) => {
		setUsersList((prevUsersList) => {
			const updatedUsers = [...prevUsersList];
			updatedUsers.unshift(user);
			return updatedUsers;
		});
	};

	return (
		<div>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={usersList} />
		</div>
	);
}

export default App;
