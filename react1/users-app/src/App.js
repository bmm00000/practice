import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

const USERS_DUMMY = [
	{ name: 'Pedro', age: 54, id: 1 },
	{ name: 'Albert', age: 22, id: 2 },
];

function App() {
	const [usersList, setUsersList] = useState(USERS_DUMMY);

	const addUserHandler = (user) => {
		setUsersList((prevUsers) => {
			const updatedUsers = [...prevUsers];
			return updatedUsers.unshift(user);
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
