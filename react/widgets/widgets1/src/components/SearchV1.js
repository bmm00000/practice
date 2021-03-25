import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
	const [term, setTerm] = useState('horse');
	const [results, setResults] = useState([]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get('http://en.wikipedia.org/w/api.php', {
				params: {
					action: 'query',
					list: 'search',
					origin: '*',
					format: 'json',
					srsearch: term,
				},
			});
			setResults(data.query.search);
		};
		if (term && !results.length) {
			search();
		} else {
			const timeoutId = setTimeout(() => {
				if (term) {
					search();
				}
			}, 500);

			return () => {
				clearTimeout(timeoutId);
			};
		}
	}, [term]);
	// we get a warning message, because every time you use a prop or state in useEffect, you have to include it in the dependency array. To avoid this warning message, we built SearchV2. If you just include 'results.length' in the dependency array, the app makes two network requests (see screenshot). We will also avoid this in SearchV2.

	const renderedResults = results.map((result) => {
		return (
			<div key={result.pageid} className='item'>
				<div className='right floated content'>
					<a
						className='ui button'
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
					>
						Go
					</a>
				</div>
				<div className='content'>
					<div className='header'>{result.title}</div>
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className='ui form'>
				<div className='field'>
					<label htmlFor='term'>Search:</label>
					<input
						type='text'
						id='term'
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className='ui celled list'>{renderedResults}</div>;
		</div>
	);
};

export default Search;