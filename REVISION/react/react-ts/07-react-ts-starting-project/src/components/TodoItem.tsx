import React from 'react';

interface TodoItemProps {
	children: string;
}

const TodoItem = ({ children }: TodoItemProps): JSX.Element => {
	return <li>{children}</li>;
};

export default TodoItem;
