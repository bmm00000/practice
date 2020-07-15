const Dog = () => {
	return (
		<div>
			<h1>im a dog</h1>
			<hr />
			<h2>wof wof {2 + 3}</h2>
		</div>
	);
};

const RanNum = () => {
	const num = Math.random() * 10;
	return (
		<div>
			<h3>The number is: {num}</h3>
			<h4>{num > 5 ? 'Big' : 'Small'} number</h4>
		</div>
	);
};

const App = () => {
	return (
		<div>
			<Dog />
			<RanNum />
			<RanNum />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
