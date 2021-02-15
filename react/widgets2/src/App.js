import React from 'react';
import Accordion from './components/Accordion';

export default () => {
	const items = [
		{ title: 'Title1', content: 'Content1...' },
		{ title: 'Title2', content: 'Content2...' },
		{ title: 'Title3', content: 'Content3...' },
	];

	return (
		<div className='ui container'>
			<Accordion items={items} />
		</div>
	);
};
