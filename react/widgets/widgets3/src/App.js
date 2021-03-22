import React from 'react';
import AccordionOne from './components/AccordionOne';
import Search from './components/SearchV2';

export default () => {
	const items = [
		{ title: 'What is React?', content: 'React is a great JS library!' },
		{ title: 'Why do we use it?', content: 'We use it because it is fast!' },
		{ title: 'Who else uses it?', content: 'Good question!' },
	];

	return (
		<div>
			{/* <AccordionOne items={items} /> */}
			<Search />
		</div>
	);
};
