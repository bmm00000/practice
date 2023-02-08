import { useRef } from 'react';

const InputUser = ({ onAddUser }) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const submitUserHandler = (event) => {
		event.preventDefault();

		const user = {
			name: nameInputRef.current.value,
			age: ageInputRef.current.value,
			id: Math.random().toString(),
		};

		onAddUser(user);
	};

	return (
		<>
			<h2>Add a new user here:</h2>
			<form onSubmit={submitUserHandler}>
				<label htmlFor='name'>Name:</label>
				<input type='text' id='name' ref={nameInputRef} />
				<label htmlFor='age'>Age:</label>
				<input type='text' id='age' ref={ageInputRef} />
				<button>Submit</button>
			</form>
		</>
	);
};

export default InputUser;
