import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState('');

	useEffect(() => {
		// firebase supports filtering (we can append some query params):
		const query =
			enteredFilter.length === 0
				? ''
				: `?orderBy="title"&equalTo=""${enteredFilter}`;
		fetch(
			'https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients.json' +
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

				// onLoadIngredients(loadedIngredients);

				// we also have the change the following in the rules of firebase:
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
	}, [enteredFilter, onLoadIngredients]);

	return (
		<section className='search'>
			<Card>
				<div className='search-input'>
					<label>Filter by Title</label>
					<input
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
