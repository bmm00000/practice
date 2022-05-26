// import {useState} from 'react'
import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';
// remember, the name of your custom hooks has to start with 'use'. and as it happens with the built-in hooks, you have to use them in the root level of your component.

const ingredientReducer = (currentIngredients, action) => {
	switch (action.type) {
		case 'SET':
			return action.ingredients;
		case 'ADD':
			return [...currentIngredients, action.ingredient];
		case 'DELETE':
			return currentIngredients.filter((ing) => ing.id !== action.id);
		default:
			throw new Error('We should not get here');
	}
};

function Ingredients() {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	const { isLoading, data, error, sendRequest } = useHttp();

	useEffect(() => {
		console.log('rendering ingredients', userIngredients);
	}, [userIngredients]);

	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		dispatch({ type: 'SET', ingredients: filteredIngredients });
	}, []);

	const addIngredientHandler = useCallback((ingredient) => {
		// dispatchHttp({ type: 'SEND' });
		// fetch(
		// 	'https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients.json',
		// 	{
		// 		method: 'POST',
		// 		body: JSON.stringify(ingredient),
		// 		headers: { 'Content-Type': 'application/json' },
		// 	}
		// )
		// 	.then((response) => {
		// 		dispatchHttp({ type: 'RESPONSE' });
		// 		return response.json();
		// 	})
		// 	.then((responseData) => {
		// 		dispatch({
		// 			type: 'ADD',
		// 			ingredient: { id: responseData.name, ...ingredient },
		// 		});
		// 	});
	}, []);

	const removeIngredientHandler = useCallback(
		(ingredientId) => {
			sendRequest(
				`https://custom-hooks-revision-default-rtdb.europe-west1.firebasedatabase.app/ingredients${ingredientId}.json`,
				'DELETE'
			);
		},
		[sendRequest]
	);

	const closeModalHandler = React.memo(() => {
		// dispatchHttp({ type: 'CLEAR' });
	});

	const ingredientList = useMemo(() => {
		return (
			<IngredientList
				ingredients={userIngredients}
				onRemoveItem={removeIngredientHandler}
			/>
		);
	}, [userIngredients, removeIngredientHandler]);

	return (
		<div className='App'>
			{error && <ErrorModal onClose={closeModalHandler}>{error}</ErrorModal>}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
			</section>
		</div>
	);
}

export default Ingredients;
