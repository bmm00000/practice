import Todo from './components/Todo';

function App() {
	return (
		<div>
			<h1>My TODO list</h1>
			<Todo title='Buy milk' />
			<Todo title='Buy sugar' />
			<Todo title='Buy batteries' />
		</div>
	);
}

export default App;
