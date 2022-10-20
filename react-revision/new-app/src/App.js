import Todo from './components/Todo';

import './App.css';

function App() {
	return (
		<div>
			<h1>My todos</h1>
			<Todo text='Buy milk' />
			<Todo text='Wash dishes' />
		</div>
	);
}

export default App;
