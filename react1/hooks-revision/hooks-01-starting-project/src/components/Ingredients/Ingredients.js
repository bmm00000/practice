import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
	const [userIngredients, setUserIngredients] = useState([]);

	useEffect(() => {
		fetch(
			'https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients.json'
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

				setUserIngredients(loadedIngredients);
			});
	}, []);
	// the function that we pass to useEffect will be executed AFTER and FOR EVERY (if there's no dependencies array) render cycle (by external dependencies we mean variables or data that we are using in the useEffect function, which we define in our component outside of the useEffect function)

	useEffect(() => {
		console.log('rendering ingredients', userIngredients);
	}, [userIngredients]);
	// according to the course, you can use useEffect as many times as you want. is this best practice?
	// the effect function will only run after a render cycle, IF userIngredients changed.

	const filteredIngredientsHandler = (filteredIngredients) => {
		setUserIngredients(filteredIngredients);
	};

	const addIngredientHandler = (ingredient) => {
		fetch(
			'https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients.json',
			{
				method: 'POST',
				body: JSON.stringify(ingredient),
				// the JSON class and its methods is a browser api, like 'fetch'
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((responseData) => {
				setUserIngredients((prevUserIngredients) => [
					...prevUserIngredients,
					{ id: responseData.name, ...ingredient },
					// responseDate.name is about the firebase api, nothing to do with react.
				]);
			});
	};

	const removeIngredientHandler = (ingredientId) => {
		setUserIngredients((prevUserIngredients) =>
			prevUserIngredients.filter((ingredient) => ingredient.id !== ingredientId)
		);
	};

	return (
		<div className='App'>
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList
					ingredients={userIngredients}
					onRemoveItem={removeIngredientHandler}
				/>
			</section>
		</div>
	);
}

export default Ingredients;
