import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
// you could also import createReducer, but createSlice is even more powerful.

const initialState = { counter: 0, showCounter: true };

createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.amount;
		},
		// we don't use the 'action' in the other reducers, because we don't need it.
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});
// we are preparing a slice of our global state, so when we have pieces of state that are not related, we could create different slices, potentially in different files, to make our code maintainable. in our case, counter and showCounter are related, so we will create only one slice for now. every slice needs a 'name' (an identifier for that piece of state). also 'reducers' is a map of all the reducers that this state slice needs, so you can add methods to the slice object, and every method will authomatically receive the latest state (even though we also receive the action in these methods as a second argument, we often don't need to use it, because these methods will be called by redux authomatically, depending which action was triggered, so we don't need to write 'if' statements anymore). also, in these methods, we can mutate the existing state, but this is only apparent, because redux toolkit internally uses another package that will create a new state object and override the state we are editing and keep all the pieces of state that we are not modifying: the whole goal is to make our lives easier while developing, so we don't need to create new objects, copy all the pieces of state that we are not changing, etc. we just only change the code that we want to change, and internally it's translated into inmutable code.

const counterReducer = (state = initialState, action) => {
	if (action.type === 'increment') {
		return { counter: state.counter + 1, showCounter: state.showCounter };
		// remember, the objects returned as new state will not merge into the former state, but will override it! that's why we need to add all the properties of our state object in all the 'if' statements, even if we don't change them (otherwise those piece of state will be deleted).

		// remember, you want to return a new object as new state. you should NEVER mutate the existing state, so you could never do this:
		// state.counter++
		// return state
		// since objects are reference values in js, it's easy to make this mistake, so watch out! even though it may work, it can lead to bugs, unwanted behaviours, etc.
	}

	if (action.type === 'increase') {
		return {
			counter: state.counter + action.amount,
			showCounter: state.showCounter,
		};
	}

	if (action.type === 'decrement') {
		return { counter: state.counter - 1, showCounter: state.showCounter };
	}

	if (action.type === 'toggle') {
		return { showCounter: !state.showCounter, counter: state.counter };
	}

	return state;
};

const store = createStore(counterReducer);

// previously, we did subscribe and dispatch form the same file (in node), but now we want to connect our react app to this redux store, so that the components of our app can dispatch and listen. that's why we export the store, so that we can use it outside of this file, and then we will connect our react app to this store (we need to provide this store to the react app (since in redux we only have one store, we only need to provide it once), but what does provide mean? GO TO THE TOP OF THE COMPONENT TREE, ie. to the index.js file):
export default store;

// if our app would continue to grow (if we manage more and more state), we could face some problems: if you have many action identifiers ('type' properties), you can introduce bugs or name clashing. another problem: the more data we manage, the bigger our state object becomes, and since we have to copy the whole object with every action type, the reducer function will become longer and longer, so you will end up with an unmaintainably big redux file (so we would have the same disadvantage that 'react context' has, ie. to put all in one long context provider file). another problem: you cannot mutate the existing state object, but you may accidentally mutate it if we have more complex data with nested objects, arrays, etc. For all these problems, in the past, we used different solutions. for example, defining and exporting/importing constants with the action identifiers, so the IDE will help you when using the constants, so you don't make mistakes. for the other problems there are also solutions for splitting your reducer into other smaller reducers, and also form third party packages that ensure that you don't mutate existing state. but we don't need to do that anymore thanks to another library: redux toolkit. it will make working with redux easier and more convenient, easier to set up and maintain:
// npm install @reduxjs/toolkit
// when you install redux toolkit, you can uninstall redux, becuase it's already included in redux toolkit (you just remove it from package.json)
