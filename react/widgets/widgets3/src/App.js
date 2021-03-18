import React from 'react';
import Accordion from './components/Accordion';

export default () => {
	const items = [
		{ title: 'What is React?', content: 'React is a great JS library!' },
		{ title: 'Why do we use it?', content: 'We use it because it is fast!' },
		{ title: 'Who else uses it?', content: 'Good question!' },
	];

	return (
		<div>
			<Accordion items={items} />
		</div>
	);
};
