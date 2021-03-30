import React, { useState } from 'react';
import Dropdown from './DropdownV2';
import Convert from './Convert';

const options = [
	{ label: 'Afrikaans', value: 'af' },
	{ label: 'Arabic', value: 'ar' },
	{ label: 'English', value: 'en' },
];

const Translate = () => {
	const [language, setLanguage] = useState(options[0]);
	const [text, setText] = useState('');

	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label htmlFor='text'>Write here:</label>
					<input
						type='text'
						id='text'
						onChange={(e) => setText(e.target.value)}
						value={text}
					/>
				</div>
			</div>
			<Dropdown
				label='Select a language:'
				options={options}
				selected={language}
				onSelectedChange={setLanguage}
			/>
			<hr />
			<h3 className='ui header'>Output</h3>
			<Convert language={language} text={text} />
		</div>
	);
};

export default Translate;
