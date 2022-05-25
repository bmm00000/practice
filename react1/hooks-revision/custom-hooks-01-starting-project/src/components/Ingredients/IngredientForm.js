import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

// how to avoid unnecessary re-render cycles:
// React.memo detects that the function that we are getting (addIngredientHandler) when the parent component (Ingredients) re-renders is the old function (the function has not been re-created in the parent component, therefore the prop has not changed), and therefore it doesn't re-render IngredientFrom, so we avoid an unnecessary render cycle. on the other hand, 'loading', if it changes, breaks through React.memo, and triggers a re-render of IngredientForm (if 'loading' didn't change, IngredientForm would not be re-rendered).
const IngredientForm = React.memo((props) => {
	const [enteredTitle, setEnteredTitle] = useState('');
	const [enteredAmount, setEnteredAmount] = useState('');
	// const [inputState, setInputState] = useState({ title: '', amount: '' });
	// you can initialize the state with any type of value (an object, a boolean, a number, a string...)

	const submitHandler = (event) => {
		event.preventDefault();
		props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
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
							// value={inputState.title}
							value={enteredTitle}
							// onChange={
							// 	(event) => {
							// 		const newTitle = event.target.value;
							// 		setInputState((prevInputState) => ({
							// 			title: newTitle,
							// 			amount: prevInputState.amount,
							// 		}));
							// 	}
							// 	// the anonymous function that we are passing to setInputState is a closure (it closes over the values of its lexical environment after the first keystroke), in our case, it closes over the 'event' that takes place with out first keystroke, and for subsequent keystroke events, it still uses the first one. this happens because react events are not the native dom events, but special synthetic events created by react, which replicate the native dom events but react adds a special factor to that: it re-uses the 'event' objects, instead of creating a new event object for every keystroke. that's why we create newTitle (so we don't use event.target.value in the 'title' key)
							// }
							// WATCH OUT! when you update the state, you are replacing THE WHOLE STATE with the object that you specified, so, eg. in the example above, if you don't include the 'amount' property anymore, it will throw a warning. with class-based components the state objects are merged, but with useState, we have to make sure that we don't lose any old data (react doesn't merge that for us). even though it looks like a bad feature of functional components, we will see later why react doesn't merge this for us anymore (because now we have more flexibility on how we manage state): SINCE WE HAVE TO REPLICATE ALL THE PRE-EXISTING KEYS OF OUR STATE OBJECT IN EVERY INPUT, IT'S MUCH BETTER TO MANAGE DIFFERENT STATES, AND NOT AN OBJECT INCLUDING ALL ELEMENTS OF OUR STATE: THAT'S HOW HOOKS GIVE US MORE FLEXIBILITY THAN CLASS-BASED COMPONENTS.
							// if there's a lot going on in your app, there's the theoretical possibility that react delays the state update for a short while, so you end up not having the most updated state. that's why we pass a function to the state update function, that returns your new state, based on the most updated state (the latest state that we set with an updating function) that is passed authomatically by react as an argument to that function (no matter if react re-created or not the functional component based on that last update; we want to get the latest state, even if it hasn't been fully committed yet for this render cycle)
							onChange={(event) => setEnteredTitle(event.target.value)}
						/>
					</div>
					<div className='form-control'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							// value={inputState.amount}
							value={enteredAmount}
							// onChange={(event) => {
							// 	const newAmount = event.target.value;
							// 	setInputState((prevInputState) => ({
							// 		amount: newAmount,
							// 		title: prevInputState.title,
							// 	}));
							// }}
							onChange={(event) => setEnteredAmount(event.target.value)}
						/>
					</div>
					<div className='ingredient-form__actions'>
						<button type='submit'>Add Ingredient</button>
						{/* {props.loading ? <LoadingIndicator /> : null} */}
						{/* the following is equivalent to the line above: */}
						{props.loading && <LoadingIndicator />}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;

// when state is updated, the component function is re-executed, but when the useState line of code is executed, react internally will not re-initialize the state, but instead useState manages the state independently from the component, so that the state survives re-renders of the component.

// the first value returned by useState is the current state snapshot for this re-render cycle of the component, meaning that when you update the state, you get the updated state as the first value.
