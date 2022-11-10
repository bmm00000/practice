import { useState } from 'react';

const Button = (props) => {
	const [clicked, setClicked] = useState(false);

	const buttonClickHandler = () => {
		setClicked(true);
	};

	const buttonText = clicked ? 'change to red' : 'change to blue';
	const buttonColor = clicked ? 'blue' : 'red';

	return (
		<>
			<button style={{ color: buttonColor }} onClick={buttonClickHandler}>
				{buttonText}
			</button>
		</>
	);
};

export default Button;
