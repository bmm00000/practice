import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();

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
				fetch(
					'https://custom-hooks-revision-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' +
						query
				)
					.then((response) => {
						return response.json();
					})
					.then((responseData) => {
						const loadedIngredients = [];

						for (let key in responseData) {
							loadedIngredients.push({
								id: key,
								title: responseData[key].title,
								amount: responseData[key].amount,
							});
						}

						onLoadIngredients(loadedIngredients);

						// we also have the change the following in the rules in firebase:
						// {
						//   "rules": {
						//     ".read": true,  // 2022-6-22
						//     ".write": true, // 2022-6-22
						//       "ingredients": {
						//         ".indexOn": ["title"]
						//       }
						//   }
						// }

						// my solution for filtering (without using filtering functionality from firebase):
						// const filteredIngredients = [];
						// for (let ingredient of loadedIngredients) {
						// 	if (ingredient.title.includes(enteredFilter)) {
						// 		filteredIngredients.push(ingredient);
						// 	}
						// }
						// onLoadIngredients(filteredIngredients);
					});
			}
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadIngredients, inputRef]);

	return (
		<section className='search'>
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
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
