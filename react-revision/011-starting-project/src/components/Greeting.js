import { useState } from 'react';

const Greeting = () => {
	const [clicked, setClicked] = useState(false);

	const buttonClickHandler = () => {
		setClicked(true);
	};

	return (
		<>
			{!clicked && <p>Text1</p>}
			{clicked && <p>Text2</p>}
			<h1>Hello!</h1>
			<button onClick={buttonClickHandler}>Click here</button>
		</>
	);
};

export default Greeting;
