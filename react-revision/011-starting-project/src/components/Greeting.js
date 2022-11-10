import { useState } from 'react';

import Output from './Output';

const Greeting = () => {
	const [clicked, setClicked] = useState(false);

	const buttonClickHandler = () => {
		setClicked(true);
	};

	return (
		<>
			{!clicked && <Output>Text1</Output>}
			{clicked && <Output>Text2</Output>}
			<h1>Hello!</h1>
			<button onClick={buttonClickHandler}>Click here</button>
		</>
	);
};

export default Greeting;
