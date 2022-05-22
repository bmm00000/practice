import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo((props) => {
	const [inputState, setInputState] = useState({ title: '', amount: '' });
	// you can initialize the state with any type of value (an object, a boolean, a number, a string...)

	const submitHandler = (event) => {
		event.preventDefault();
		// ...
	};

	return (
		<section className='ingredient-form'>
			<Card>
				<form onSubmit={submitHandler}>
					<div className='form-control'>
						<label htmlFor='title'>Name</label>
						<input
							type='text'
							id='title'
							value={inputState.title}
							onChange={
								(event) => {
									const newTitle = event.target.value;
									setInputState((prevInputState) => ({
										title: newTitle,
										amount: prevInputState.amount,
									}));
								}
								// the anonymous function that we are passing to inputState[1] is a closure (it closes over the values of its lexical environment after the first keystroke), in our case, it closes over the 'event' that takes place with out first keystroke, and for subsequent keystroke events, it still uses the first one. this happens because react events are not the native dom events, but special synthetic events created by react, which replicate the native dom events but react adds a special factor to that: it re-uses the 'event' objects, instead of creating a new event object for every keystroke. that's why we create newTitle
							}
							// WATCH OUT! when you update the state, you are replacing THE WHOLE STATE with the object that you specified, so, eg. in the example above, if you don't include the 'amount' property anymore, it will throw an warning. with class-based components the state objects are merged, but with useState, we have to make sure that we don't lose any old data (react doesn't merge that for us). even though it looks like a bad feature of functional components, we will see later why react doesn't merge this for us anymore (because now we have more flexibility to how we manaage state).
							// however, if there's a lot going on in your app, there's the theoretical possibility that react delays the state update for a short while, so you end up not having the most updated state when you use inputState[0].amount in the above input. that's why we pass a function to the state update function, that returns your new state, based on the most updated state (the latest state that we set with an updating function) that is passed authomatically by react as an argument to that function (no matter if react re-created or not the function based on that last update; we want to get the latest state, even if it hasn't been fully committed yet for this render cycle)
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							value={inputState.amount}
							onChange={(event) => {
								const newAmount = event.target.value;
								setInputState((prevInputState) => ({
									amount: newAmount,
									title: prevInputState.title,
								}));
							}}
						/>
					</div>
					<div className='ingredient-form__actions'>
						<button type='submit'>Add Ingredient</button>
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;

// when state is updated, the component function is re-executed, but when the useState line of code is executed, react internally will not re-initialize the state, but instead useState manages the state independently from the component, so that the state survives re-renders of the component.

// the first value returned by useState is the current state snapshot for this re-render cycle of the component, meaning that when you update the state, you get the updated state as the first value. (you can scroll over your mouse over the name of the component, so you will see the current state and the function to update it)
