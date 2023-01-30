import { useState } from 'react';

const Button = () => {
	const [color, setColor] = useState('blue');

	const nextColor = color === 'blue' ? 'red' : 'blue';

	const clickHandler = () => {
		setColor(nextColor);
	};

	return (
		<button style={{ backgroundColor: color }} onClick={clickHandler}>
			Change to {nextColor}
		</button>
	);
};

export default Button;
