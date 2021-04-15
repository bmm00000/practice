import React, { useState } from 'react';

const SearchBar = ({ onTermSubmit }) => {
	const [term, setTerm] = useState('');

	const onInputChange = (e) => {
		setTerm(e.target.value);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		onTermSubmit(term);
	};

	return (
		<div className='ui segment'>
			<form action='' className='ui form' onSubmit={onFormSubmit}>
				<div className='field'>
					<label htmlFor=''>Video Search</label>
					<input type='text' onChange={onInputChange} value={term} />
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
