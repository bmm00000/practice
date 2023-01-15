import { useState } from 'react';

const UserForm = ({ onAddUser }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const submitHandler = (event) => {
		event.preventDefault();

		onAddUser({ name, email });
	};

	return (
		<form onSubmit={submitHandler}>
			<label htmlFor='name'>Name:</label>
			<input
				type='text'
				id='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<label htmlFor='email'>Email:</label>
			<input
				type='text'
				id='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<button>Add user</button>
		</form>
	);
};

export default UserForm;
