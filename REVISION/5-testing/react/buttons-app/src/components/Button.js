import { useState } from 'react';

const Button = () => {
	const [color, setColor] = useState('blue');
	const [disabled, setDisabled] = useState(false);

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
				style={{ backgroundColor: color }}
				onClick={clickButtonHandler}
				disabled={disabled}
			>
				Change to {nextColor}
			</button>
			<input type='checkbox' onChange={clickCheckboxHandler} />
		</>
	);
};

export default Button;
