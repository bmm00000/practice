import Todos from './components/Todos';

const items = [
	{ id: '1', text: 'Learn React' },
	{ id: '2', text: 'Learn TS' },
];

function App(): JSX.Element {
	return (
		<>
			<h1>These are my todos:</h1>
			<Todos items={items} />
		</>
	);
}

export default App;
