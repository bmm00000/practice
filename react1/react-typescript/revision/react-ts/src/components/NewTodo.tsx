import React from 'react';

const NewTodo = () => {
	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (
		<form action='' onSubmit={submitHandler}>
			<label htmlFor='input'>New todo</label>
			<input type='text' id='input' />
			<button type='submit'>Add todo</button>
		</form>
	);
};

export default NewTodo;
