import { useState } from 'react';

import Output from './Output';
import Async from './Async';

function Greeting() {
	const [changedText, setChangedText] = useState(false);

	function changeTextHandler() {
		setChangedText(true);
	}

	return (
		<section>
			<h1>Hello there!</h1>
			{!changedText && <Output>Text hasn't changed</Output>}
			{changedText && <Output>Text has changed</Output>}
			<button onClick={changeTextHandler}>Click to change text</button>
			<Async />
		</section>
	);
}

export default Greeting;
