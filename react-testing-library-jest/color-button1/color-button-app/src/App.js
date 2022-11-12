import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

import Button from './components/Button';

function App() {
	const [checked, setChecked] = useState(false);

	const onCheckboxChange = () => {
		setChecked((oldChecked) => !oldChecked);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<Button checked={checked} />
				<label htmlFor='disable-button'>Disable the button</label>
				<input
					type='checkbox'
					id='disable-button'
					onChange={onCheckboxChange}
				/>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
