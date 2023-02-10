import TodoItem from './TodoItem';
import Todo from '../models/todo';

interface TodosProps {
	items: Todo[];
}

const Todos = ({ items }: TodosProps): JSX.Element => {
	return (
		<>
			<h1>These are my todos:</h1>
			<ul>
				{items.map((item: Todo) => {
					return <TodoItem key={item.id}>{item.todoText}</TodoItem>;
				})}
			</ul>
		</>
	);
};

export default Todos;
