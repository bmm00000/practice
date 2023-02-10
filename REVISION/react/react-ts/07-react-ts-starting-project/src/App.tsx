import Todos from './components/Todos';
import Todo from './models/todo';

const App = (): JSX.Element => {
	const items = [new Todo('Learn React'), new Todo('Learn TS')];

	return (
		<div>
			<Todos items={items} />
		</div>
	);
};

export default App;
