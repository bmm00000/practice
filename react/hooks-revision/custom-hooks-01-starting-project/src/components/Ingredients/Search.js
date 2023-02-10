import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo((props) => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();
	const { isLoading, data, error, clear, sendRequest } = useHttp();

	useEffect(() => {
		const timer = setTimeout(() => {
			// since we are using the cleanup function below, we don't need the following 'if' statement (I don't know why the course keeps it):
			if (enteredFilter === inputRef.current.value) {
				// due to how closures work in js, the enteredFilter variable name will have been closed when the callback was declared (ie. before the 500 milliseconds passed). after the 500 passed, when the callback is executed, js will look up the locked in value of enteredFilter, and that will be the initial value (before the 500 millisecons passed), because we are working with 'const' and therefore, the variable is in block scope. if the current value (inputRef.current.value) is equal to the value 500 millisecons ago (enteredFilter), it means that we have not typed anything new in the last 500 millisecons, so we want to make the http request.

				// firebase supports filtering (we can append some query params):
				const query =
					enteredFilter.length === 0
						? ''
						: `?orderBy="title"&equalTo="${enteredFilter}"`;
				// this doesn't work. is it because anything changed with firebase?
				sendRequest(
					'https://custom-hooks-revision-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' +
						query,
					'GET'
				);
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, inputRef, sendRequest]);

	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedIngredients = [];
			for (let key in data) {
				loadedIngredients.push({
					id: key,
					title: data[key].title,
					amount: data[key].amount,
				});
			}
			onLoadIngredients(loadedIngredients);
		}
	}, [data, isLoading, error, onLoadIngredients]);

	return (
		<section className='search'>
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
					{isLoading && <span>Loading...</span>}
					<input
						ref={inputRef}
						type='text'
						value={enteredFilter}
						onChange={(event) => setEnteredFilter(event.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
