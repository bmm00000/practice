import { useState } from 'react';

function Button(props) {
	const [color, setColor] = useState('red');
	const [disabled, setDisabled] = useState(false);

	const nextColor = color === 'red' ? 'blue' : 'red';
	const buttonColor = disabled ? 'grey' : color;

	function changeColorHandler() {
		setColor(nextColor);
	}

	function changeCheckboxHandler(event) {
		setDisabled(event.target.checked);
	}

	return (
		<>
			<button
				style={{ backgroundColor: buttonColor }}
				onClick={changeColorHandler}
				disabled={disabled}
			>
				Change to {nextColor}
			</button>
			<label htmlFor='toggle-able'>Able or disable button</label>
			<input
				type='checkbox'
				onChange={changeCheckboxHandler}
				id='toggle-able'
			/>
		</>
	);
}

export default Button;
