import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	function printThis() {
		return 'print it!';
	}
	const title = 'This is the title';

	return (
		<div>
			<h1>{title}</h1>
			<p>{printThis()}</p>
			<button style={{ backgroundColor: 'blue', color: 'white' }}>
				Click here
			</button>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
