import React from 'react';
import { useRef } from 'react';

interface TodosFormProps {
	onAddTodo: (input: string) => void;
}

const TodosForm = ({ onAddTodo }: TodosFormProps): JSX.Element => {
	const todoInputRef = useRef<HTMLInputElement>(null);

	const submitFormHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const inputValue = todoInputRef.current!.value;
		onAddTodo(inputValue);
		todoInputRef.current!.value = '';
	};

	return (
		<form onSubmit={submitFormHandler}>
			<label htmlFor='todo'>Add todo:</label>
			<input type='text' id='todo' ref={todoInputRef} />
			<button>Add todo</button>
		</form>
	);
};

export default TodosForm;
