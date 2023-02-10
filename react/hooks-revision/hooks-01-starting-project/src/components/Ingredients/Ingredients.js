// import {useState} from 'react'
import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

// we define the reducer function outside of the component, so it's not re-created every time that the component is re-rendered (you could also have the reducer inside the component, in case you used props in your reducer. but if you don't use props in your reducer, it's better to put it outside of the component to avoid unnecessary re-creations of the reducer):
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

const httpReducer = (currentHttpState, action) => {
	switch (action.type) {
		case 'SEND':
			return { loading: true, error: null };
		case 'RESPONSE':
			// return {loading: false, error: null}
			// or the following (you want to modify only something from the pre-existing state: you specify what you want to replace, and it will be overriten in the spread pre-existing state):
			return { ...currentHttpState, loading: false };
		case 'ERROR':
			return { loading: false, error: action.errorMessage };
		case 'CLEAR':
			return { ...currentHttpState, error: null };
		default:
			throw new Error('We should not get here');
	}
};

function Ingredients() {
	// const [userIngredients, setUserIngredients] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState();
	// the two last states above are related to us interacting with an http request. therefore, we can manage them with useReducer (because sometimes, we even update them at the same time, eg. setIsLoading and setError) (we use useReducer when we have more complex state, ie. multiple ways of changing a state and some of these ways depend on the previous state or on other states; in our case, we could also use just useState, but useReducer is cleaner, because we have all our updating logic in the reducer):
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		loading: false,
		error: null,
	});
	// equivalent to what happens when we use useState, when we work with useReducer, react will re-render the component whenever your reducer returns the new state.

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
		console.log('rendering re-newed set of ingredients', userIngredients);
	}, [userIngredients]);
	// according to the course, you can use useEffect as many times as you want. is this best practice?
	// the effect function will only run after a render cycle, IF userIngredients changed.

	const filteredIngredientsHandler = useCallback((filteredIngredients) => {
		dispatch({ type: 'SET', ingredients: filteredIngredients });
	}, []);
	// useCallback caches the function, so it survives re-render cycles (the function will not be re-created when the component is re-rendered)

	// how to avoid unnecessary re-render cycles:
	// since we want to avoid this function to be re-created (and therefore passed down to the IngredientForm component as a newly created prop) every time that the Ingredients component re-renders, we will use useCallback (if we don't use useCallback here, the IngredientForm component will be re-rendered (even with React.memo), because we are creating a new function here every time Ingredients re-renders, so the props that we pass to IngredientForm have changed):
	const addIngredientHandler = useCallback((ingredient) => {
		dispatchHttp({ type: 'SEND' });
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
				dispatchHttp({ type: 'RESPONSE' });
				return response.json();
			})
			.then((responseData) => {
				// setUserIngredients((prevUserIngredients) => [
				// 	...prevUserIngredients,
				// 	{ id: responseData.name, ...ingredient },
				// 	// responseDate.name is about the firebase api, nothing to do with react.
				// ]);
				dispatch({
					type: 'ADD',
					ingredient: { id: responseData.name, ...ingredient },
				});
			});
	}, []);
	// the dependencies array is empty, becuase, for the dispatch functions, as it happens with the updating functions of useState, it's guaranteed by react to not change between render cycles. also, 'ingredient' is a local argument that we are getting in the function, not an external dependency, so we don't need to add it either. therefore, we don't have any external dependencies: this function should never be re-built.

	// we will also avoid an unnecessary re-render here, as we did before in 'addIngredientHandler'. we could also use React.memo in IngredientList, but we also have another alternative: useMemo. useCallback is a hook to save a function that doesn't change, so that the function is not re-created; and useMemo is a hook to save a value which is saved, so that the value is not re-created (we are going to use useMemo in IngredientList below):
	const removeIngredientHandler = useCallback((ingredientId) => {
		dispatchHttp({ type: 'SEND' });
		fetch(
			`https://hooks-revision-a65e1-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json	`,
			{
				method: 'DELETE',
			}
		)
			.then((response) => {
				dispatchHttp({ type: 'RESPONSE' });
				// setUserIngredients((prevUserIngredients) =>
				// 	prevUserIngredients.filter(
				// 		(ingredient) => ingredient.id !== ingredientId
				// 	)
				// );
				dispatch({ type: 'DELETE', id: ingredientId });
			})
			.catch((error) => {
				// setError(error.message)
				// there's a message property in the error object that we receive from firebase. we can also update our error state with any other message:
				// setError('Something went wrong!');
				// setIsLoading(false);
				dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
			});
		// remember, react batches mutiple state updates together in order to avoid unnecessary render cycles. therefore, for example, if you have a handler function where you update several states, right in the next line where you update a single state, you can't immediately use the new state if you are not using the function form to update state! (because react will batch all state updates and schedule them to be executed together). THEREFORE, ALL STATE UPDATES FROM ONE AND THE SAME SYNCHRONOUS EVENT HANDLER ARE BATCHED TOGETHER. for example, in the former catch block, the two updates are executed synchronously after each other (in the former version, when we used useState), so react will batch the two state updates together. as a result, each state update will not cause a render cycle, and we will only have one render cycle that reflects both state updates (see a more detailed explanation at the bottom of this file).
	}, []);

	const closeModalHandler = useCallback(() => {
		dispatchHttp({ type: 'CLEAR' });
	}, []);

	// when using useMemo, you have to pass a function (that react will execute for you) that should return the value that you want to memorize.
	const ingredientList = useMemo(() => {
		return (
			<IngredientList
				ingredients={userIngredients}
				onRemoveItem={removeIngredientHandler}
			/>
		);
	}, [userIngredients, removeIngredientHandler]);
	// the array of dependencies tells react when it should re-run the function to create a new object that it should memorize.
	// useMemo is an alternative to React.memo. if we are talking about storing whole components, you probably want to use React.memo, but keep in mind that, with useMemo, you can store any data which you don't want to re-create on every render cycle of the component (eg. for an operation that calculates a complex value and it takes some time, then you may want to consider useMemo).
	// by the way, with all these optimizations that we did with React.memo, useMemo, and useCallback, when we talked about re-rendering, we meant re-render in the virtual dom, not in the real dom.
	// but if you have very trivial components, it might even be worth not adding React.memo (or useMemo) becuase react will then always need to check whether props changed, and if it's as super small component, re-rendering it might even be faster than performing that check, so you need to evaluate if this is really needed at all (for example, in our ErrorModal, we could even get away without using React.memo and it would be fine).

	return (
		<div className='App'>
			{httpState.error && (
				<ErrorModal onClose={closeModalHandler}>{httpState.error}</ErrorModal>
			)}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={httpState.loading}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				{ingredientList}
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
