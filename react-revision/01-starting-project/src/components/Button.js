import { useState } from 'react';

function Button(props) {
	const [color, setColor] = useState('red');
	const [disabled, setDisabled] = useState(false);

	const nextColor = color === 'red' ? 'blue' : 'red';

	function changeColorHandler() {
		setColor(nextColor);
	}

	function changeCheckboxHandler(event) {
		setDisabled(event.target.checked);
	}

	return (
		<>
			<button
				style={{ backgroundColor: color }}
				onClick={changeColorHandler}
				disabled={disabled}
			>
				Change to {nextColor}
			</button>
			<input type='checkbox' onChange={changeCheckboxHandler} />
		</>
	);
}

export default Button;
