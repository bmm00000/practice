import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';

const items = [
	{ title: 'What is React', content: 'React is a JS library' },
	{ title: 'Why do we use React?', content: 'We use it for efficiency' },
	{ title: 'Is it your fave library?', content: 'Yes it is!!' },
];

const options = [
	{ label: 'The color of love', value: 'red' },
	{ label: 'The color of nature', value: 'green' },
	{ label: 'The color of the sky', value: 'blue' },
];

export default () => {
	const [selected, setSelected] = useState(options[0]);
	return (
		<div>
			{/* <Accordion items={items} /> */}
			{/* <Search /> */}
			<Dropdown
				selected={selected}
				onSelectChange={setSelected}
				options={options}
			/>
		</div>
	);
};
