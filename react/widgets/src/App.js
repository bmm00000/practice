import React from 'react';
import Accordion from './components/Accordion';

const items = [
	{ title: 'What is React', content: 'React is a JS library' },
	{ title: 'Why do we use React?', content: 'We use it for efficiency' },
	{ title: 'Is it your fave library?', content: 'Yes it is!!' },
];

export default () => {
	return (
		<div>
			<Accordion items={items} />
		</div>
	);
};
