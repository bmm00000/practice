import { useRef } from 'react';

import classes from './NewTodo.module.css';

const NewTodo: React.FC<{ onAddTodo: (todoText: string) => void }> = (
	props
) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const enteredText = inputRef.current!.value;

		if (enteredText.trim().length === 0) {
			// throw an error...
			return;
		}

		props.onAddTodo(enteredText);
	};

	return (
		<form action='' onSubmit={submitHandler} className={classes.form}>
			<label htmlFor='input'>Type new todo</label>
			<input type='text' id='input' ref={inputRef} />
			<button>Add new todo</button>
		</form>
	);
};

export default NewTodo;
