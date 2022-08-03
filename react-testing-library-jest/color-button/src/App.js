import { useState } from 'react';

function App() {
	const [buttonColor, setButtonColor] = useState('red');

	const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

	const changeColorHandler = () => {
		setButtonColor(newButtonColor);
	};

	return (
		<div>
			<button
				style={{ backgroundColor: buttonColor }}
				onClick={changeColorHandler}
			>
				Change to {newButtonColor}
			</button>
			<input type='checkbox' />
		</div>
	);
}

export default App;
