import { createSlice } from '@reduxjs/toolkit';
// you could also import createReducer, but createSlice is even more powerful.

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
	name: 'counter',
	initialState: initialCounterState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		// we don't use the 'action' in the other reducers, because we don't need it, but keep in mind that it is there as a second parameter.
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

// for dispatching actions, createSlice creates unique action identifiers for our different reducers. to get hold of these action identifiers, you access them through the 'actions' object, and then the keys will match the method names of our createSlice function. these keys will not be the reducer methods defined above, but instead we will access methods created authomatically by 'redux toolkit', which, when called, will create action objects for us. for example, 'counterSlice.actions.toggleCounter' will return an action object of this shape: {type: 'some auto-generated unique identifier'}. therefore, these methods are called 'action creators' (so we don't have to worry about creating action objects, identifiers, avoiding typos and name clashing, etc.). therefore, we could export our actions and import them where needed:
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;

// we are preparing a slice of our global state, so when we have pieces of state that are not related, we could create different slices, potentially in different files, to make our code maintainable. in our case, counter and showCounter are related, so we will create only one slice for now. every slice needs a 'name' (an identifier for that piece of state). also 'reducers' is an object (a map) of all the reducers that this state slice needs, so you can add methods (one method for each 'if' statement that you had before) to the slice object, and every method will authomatically receive the latest state (even though we also receive the action in these methods as a second argument, we often don't need to use it, because these methods will be called by redux authomatically, depending which action was triggered, so we don't need to write 'if' statements anymore). also, in these methods, we can mutate the existing state, but this is only apparent, because redux toolkit internally uses another package that will create a new state object and override the state we are editing in an inmutable way, and also keep all the pieces of state that we are not modifying (so we don't need to copy all pieces of state every time): the whole goal is to make our lives easier while developing, so we don't need to create new objects, copy all the pieces of state that we are not changing, etc. we just only change the code that we want to change, and internally it's translated into inmutable code.
