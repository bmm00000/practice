import Todo from '../models/todo';
import TodoItem from './TodoItem';

interface TodosProps {
	items: Todo[];
}

const Todos = ({ items }: TodosProps): JSX.Element => {
	return (
		<ul>
			{items.map((item) => (
				<TodoItem>{item.text}</TodoItem>
			))}
		</ul>
	);
};

export default Todos;
