import { useState } from 'react';

const Button = () => {
	const [color, setColor] = useState('blue');
	const [disabled, setDisabled] = useState(false);

	const renderedColor = disabled ? 'grey' : color;
	const nextColor = color === 'blue' ? 'red' : 'blue';

	const clickButtonHandler = () => {
		setColor(nextColor);
	};

	const clickCheckboxHandler = (event) => {
		setDisabled(event.target.checked);
	};

	return (
		<>
			<button
				style={{ backgroundColor: renderedColor }}
				onClick={clickButtonHandler}
				disabled={disabled}
			>
				Change to {nextColor}
			</button>
			<label htmlFor='disable-button'>Disable button</label>
			<input
				type='checkbox'
				onClick={clickCheckboxHandler}
				id='disable-button'
			/>
		</>
	);
};

export default Button;
