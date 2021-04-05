import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Search from './components/SearchV2';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

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
			<Header />
			<Route path='/'>
				<Accordion items={items} />
			</Route>
			<Route path='/list'>
				<Search />
			</Route>
			<Route path='/dropdown'>
				<Dropdown
					label='Select a color:'
					options={options}
					selected={selected}
					onSelectChange={setSelected}
				/>
			</Route>
			<Route path='/translate'>
				<Translate />
			</Route>
		</div>
	);
};
