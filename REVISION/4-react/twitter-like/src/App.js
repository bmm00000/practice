import PostList from './components/PostList';

const posts = [
	{ author: 'Jose', text: 'React is awesome' },
	{ author: 'James', text: 'Typescript is great' },
];

function App() {
	return (
		<main>
			<PostList posts={posts} />
		</main>
	);
}

export default App;
