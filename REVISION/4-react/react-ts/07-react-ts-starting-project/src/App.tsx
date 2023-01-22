import Todos from './components/Todos';
import Todo from './models/todo';

function App() {
	const items = [new Todo('Learn React'), new Todo('Learn TS')];

	return (
		<div>
			<Todos items={items} />
		</div>
	);
}

export default App;
