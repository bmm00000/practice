import { useState } from 'react';

const Button = ({ checked }) => {
	const [clicked, setClicked] = useState(false);

	const buttonClickHandler = () => {
		setClicked(true);
	};

	const buttonText = clicked ? 'changed to blue!' : 'change to blue';
	let buttonColor = clicked ? 'blue' : 'red';

	return (
		<>
			<button
				style={{ color: checked ? 'grey' : buttonColor }}
				onClick={buttonClickHandler}
				disabled={checked}
			>
				{buttonText}
			</button>
		</>
	);
};

export default Button;
