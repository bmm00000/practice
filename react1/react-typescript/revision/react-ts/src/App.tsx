import Todos from './components/Todos';
import Todo from './models/todo';

const todos = [new Todo('Learn react'), new Todo('Learn ts')];

function App() {
	return (
		<div>
			<Todos items={todos} />
		</div>
	);
}

export default App;
