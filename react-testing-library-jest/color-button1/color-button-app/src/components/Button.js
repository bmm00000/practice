import { useState } from 'react';

const Button = ({ checked }) => {
	const [clicked, setClicked] = useState(false);

	const buttonClickHandler = () => {
		setClicked(true);
	};

	const buttonText = clicked ? 'changed to blue!' : 'change to blue';
	const buttonColor = clicked ? 'blue' : 'red';

	return (
		<>
			<button
				style={{ color: buttonColor }}
				onClick={buttonClickHandler}
				disabled={checked}
			>
				{buttonText}
			</button>
		</>
	);
};

export default Button;
