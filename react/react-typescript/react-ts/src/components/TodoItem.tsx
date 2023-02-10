import classes from './TodoItem.module.css';

const TodoItem: React.FC<{
	text: string;
	onRemoveTodo: () => void;
}> = (props) => {
	return (
		<li className={classes.item} onClick={props.onRemoveTodo}>
			{props.text}
		</li>
	);
};
// we don't expect the 'key' because we are using the FC base type, which already includes the 'key' prop.

export default TodoItem;
