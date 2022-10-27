import { useState } from 'react';

function Button(props) {
	const [color, setColor] = useState('red');
	const nextColor = color === 'red' ? 'blue' : 'red';

	function changeColorHandler() {
		setColor(nextColor);
	}

	return (
		<button style={{ backgroundColor: color }} onClick={changeColorHandler}>
			Change to {nextColor}
		</button>
	);
}

export default Button;
