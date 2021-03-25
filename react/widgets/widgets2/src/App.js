import React, { useState } from 'react';
import AccordionOne from './components/AccordionOne';
import Search from './components/SearchV2';
import Dropdown from './components/DropdownV22';

const items = [
	{ title: 'What is React?', content: 'React is a great JS library!' },
	{ title: 'Why do we use it?', content: 'We use it because it is fast!' },
	{ title: 'Who else uses it?', content: 'Good question!' },
];

const options = [
	{ label: 'The color of love', value: 'red' },
	{ label: 'The color of nature', value: 'green' },
	{ label: 'The color of the sky', value: 'blue' },
];

export default () => {
	const [selected, setSelected] = useState(options[0]);
	const [show, setShow] = useState(true);

	return (
		<div>
			<button onClick={() => setShow(!show)}>Toggle</button>
			{/* <AccordionOne items={items} /> */}
			{/* <Search /> */}
			{show ? (
				<Dropdown
					options={options}
					selected={selected}
					onSelectedChange={setSelected}
				/>
			) : null}
		</div>
	);
};
