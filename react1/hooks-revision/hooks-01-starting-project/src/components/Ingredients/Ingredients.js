import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

function Ingredients() {
	const [userIngredients, setUserIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	// the three states above are related to us interacting with an http request.

	// we don't need the following useEffect, becuase we already make the same http request in Search.js when the app is loaded for the first time (and there are no filter criteria in Search.js):
	// useEffect(() => {
	// 	fetch(
	// 		'https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients.json'
	// 	)
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((responseData) => {
	// 			const loadedIngredients = [];

	// 			for (let key in responseData) {
	// 				loadedIngredients.push({
	// 					id: key,
	// 					title: responseData[key].title,
	// 					amount: responseData[key].amount,
	// 				});
	// 			}

	// 			setUserIngredients(loadedIngredients);
	// 		});
	// }, []);
	// the function that we pass to useEffect will be executed AFTER and FOR EVERY (if there's no dependencies array) render cycle (by external dependencies we mean variables or data that we are using in the useEffect function, which we define in our component outside of the useEffect function)

	useEffect(() => {
		console.log('rendering ingredients', userIngredients);
	}, [userIngredients]);
	// according to the course, you can use useEffect as many times as you want. is this best practice?
	// the effect function will only run after a render cycle, IF userIngredients changed.

	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		setUserIngredients(filteredIngredients);
	}, []);
	// useCallback caches the function, so it survives re-render cycles (the function will not be re-created when the component is re-rendered)

	const addIngredientHandler = (ingredient) => {
		setIsLoading(true);
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
				setIsLoading(false);
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
		setIsLoading(true);
		fetch(
			`https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients/${ingredientId}.jsonasdfas`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => {
				setIsLoading(false);
				setUserIngredients((prevUserIngredients) =>
					prevUserIngredients.filter(
						(ingredient) => ingredient.id !== ingredientId
					)
				);
			})
			.catch((error) => {
				// setError(error.message)
				// there's a message property in the error object that we receive from firebase. we can also update our error state with any other message:
				setError('Something went wrong!');
				setIsLoading(false);
			});
		// remember, react batches mutiple state updates together in order to avoid unnecessary render cycles. therefore, for example, if you have handler function where you update several states, right in the next line where you update a single state, you can't immediately use the new state if you are not using the function form to update state! (because react will batch all state updates and schedule them to be executed together). THEREFORE, ALL STATE UPDATES FROM ONE AND THE SAME SYNCHRONOUS EVENT HANDLER ARE BATCHED TOGETHER. for example, in the former catch block, the two updates are executed synchronously after each other, so react will batch the two state updates together. as a result, each state update will not cause a render cycle, and we will only have one render cycle that reflects both state updates (see a more detailed explanation at the bottom of this file).
	};

	const closeModalHandler = () => {
		setError(null);
	};

	return (
		<div className='App'>
			{error && <ErrorModal onClose={closeModalHandler}>{error}</ErrorModal>}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
			/>

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

// More on State Batching & State Updates:

// React batches state updates - see: https://github.com/facebook/react/issues/10231#issuecomment-316644950

// That simply means that calling

// setName('Max');
// setAge(30);
// in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.

// Instead, the component will only re-render once and both state updates will be applied simultaneously.

// Not directly related, but also sometimes misunderstood, is when the new state value is available.

// Consider this code:

// console.log(name); // prints name state, e.g. 'Manu'
// setName('Max');
// console.log(name); // ??? what gets printed? 'Max'?
// You could think that accessing the name state after setName('Max'); should yield the new value (e.g. 'Max') but this is NOT the case. Keep in mind, that the new state value is only available in the next component render cycle (which gets scheduled by calling setName()).

// Both concepts (batching and when new state is available) behave in the same way for both functional components with hooks as well as class-based components with this.setState()!
