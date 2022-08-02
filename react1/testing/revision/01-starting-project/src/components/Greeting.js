import { useState } from 'react';

import Output from './Output';

const Greeting = () => {
	const [changedText, setChangedText] = useState(false);

	const changeTextHandler = () => {
		setChangedText(true);
	};

	return (
		<div>
			<h1>Hello World!</h1>
			{!changedText && <Output>Text has not changed yet</Output>}
			{changedText && <Output>Text has changed!</Output>}
			<button onClick={changeTextHandler}>Change text</button>
		</div>
	);
};

export default Greeting;
