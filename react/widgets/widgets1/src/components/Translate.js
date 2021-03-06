import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Convert from './Convert';

const options = [
	{ label: 'Afrikaans', value: 'af' },
	{ label: 'Hindi', value: 'hi' },
	{ label: 'Arabic', value: 'ar' },
];

const Translate = () => {
	const [language, setLanguage] = useState(options[0]);
	const [text, setText] = useState('');

	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label htmlFor='text'>Enter text:</label>
					<input
						id='text'
						type='text'
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</div>
			</div>
			<Dropdown
				label='Select a language:'
				options={options}
				selected={language}
				onSelectChange={setLanguage}
			/>
			<br />
			<h4 className='ui header'>Output</h4>
			<Convert language={language} text={text} />
		</div>
	);
};

export default Translate;
