import React from 'react';
import ReactDOM from 'react-dom';

function clickHere() {
	return 'Click here!';
}

const App = () => {
	const title = 'Hello everyone';
	const labelText = { text: 'Enter your name' };
	return (
		<div>
			<h1>{title}</h1>
			<label className='first-label' htmlFor='name'>
				{labelText.text}
			</label>
			<input type='text' id='name' />
			<button style={{ backgroundColor: 'blue', color: 'white' }}>
				{clickHere()}
			</button>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
