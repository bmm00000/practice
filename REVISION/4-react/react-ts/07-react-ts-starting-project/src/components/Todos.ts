import TodoItem from './TodoItem';
import Todo from '../models/todo';

const Todos = ({ items }) => {
	return (
		<ul>
			{items.map((item: Todo) => {
				return <TodoItem key={item.id}>{item.todoText}</TodoItem>;
			})}
		</ul>
	);
};

export default Todos;
