import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';
// import ErrorModal from './components/UI/ErrorModal';

function App() {
	const [usersList, setUsersList] = useState([]);
	// const [validInput, setValidInput] = useState(true);

	// const addUserHandler = (user) => {
	// 	setUsersList((prevUsersList) => {
	// 		const updatedUsers = [...prevUsersList];
	// 		updatedUsers.unshift(user);
	// 		return updatedUsers;
	// 	});
	// };
	// we have to change the function above, because we need the username and age here, in order to conditionally render the modal.

	// let content;
	const addUserHandler = (username, age) => {
		// if (username.trim().length === 0 || age.trim().length === 0) {
		// 	setValidInput(false);
		// 	content = 'Input fields cannot be empty!';
		// } else if (+age < 1) {
		// 	setValidInput(false);
		// 	content = 'Age cannot be negative!';
		// } else {
		setUsersList((prevUsersList) => {
			return [
				{ name: username, age, id: Math.random().toString() },
				...prevUsersList,
			];
		});
		// }
	};
	// console.log(content); // WHY IS IT UNDEFINED HERE????

	// const deleteModal = () => {
	// 	setValidInput(true);
	// };

	return (
		<>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={usersList} />
			{/* {!validInput && (
				<ErrorModal title={'Error!'} message={content} onDelete={deleteModal} />
				// WHY IS CONTENT UNDEFINED??
			)} */}
		</>
	);
}

export default App;
