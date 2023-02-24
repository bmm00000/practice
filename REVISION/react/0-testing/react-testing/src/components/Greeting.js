import { useState } from 'react';
import Output from './Output';

const Greeting = () => {
	const [textChanged, setTextChanged] = useState(false);

	const clickButtonHandler = () => {
		setTextChanged(true);
	};

	return (
		<>
			<h1>Hello there</h1>
			{!textChanged && <Output>Text has not been changed yet</Output>}
			{textChanged && <Output>Text has been changed now!</Output>}
			<button onClick={clickButtonHandler}>Change text</button>
		</>
	);
};

export default Greeting;
