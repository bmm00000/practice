import { createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
// you could also import createReducer, but createSlice is even more powerful.

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
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
		// we don't use the 'action' in the other reducers, because we don't need it, but keep in mind that it is there as a second parameter.
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});
// we are preparing a slice of our global state, so when we have pieces of state that are not related, we could create different slices, potentially in different files, to make our code maintainable. in our case, counter and showCounter are related, so we will create only one slice for now. every slice needs a 'name' (an identifier for that piece of state). also 'reducers' is an object (a map) of all the reducers that this state slice needs, so you can add methods (one method for each 'if' statement that you had before) to the slice object, and every method will authomatically receive the latest state (even though we also receive the action in these methods as a second argument, we often don't need to use it, because these methods will be called by redux authomatically, depending which action was triggered, so we don't need to write 'if' statements anymore). also, in these methods, we can mutate the existing state, but this is only apparent, because redux toolkit internally uses another package that will create a new state object and override the state we are editing in an inmutable way, and also keep all the pieces of state that we are not modifying (so we don't need to copy all pieces of state every time): the whole goal is to make our lives easier while developing, so we don't need to create new objects, copy all the pieces of state that we are not changing, etc. we just only change the code that we want to change, and internally it's translated into inmutable code.

// for dispatching actions, createSlice creates unique action identifiers for our different reducers. to get hold of these action identifiers, you access them through the 'actions' object, and then the keys will match the method names of our createSlice function:
counterSlice.actions;

// const store = createStore(counterSlice.reducer);
// when we access 'reducer', we access a big internal reducer with 'if' statements that trigger our methods that we specified in 'reducers'.
// however, if we had a big application with multiple state slices, we would have a problem because we would have only one reducer passed to createStore. with standard redux, we could use the combineReducers function (imported from redux), but even better we can import configureStore from the redux toolkit. configureStore, like createStore, creates a store, but it makes it easier to merge multiple reducers into one reducer (it expects a configuration object, that expects a 'reducer' property; no matter if it's createStore or configureStore, redux wants one main reducer function which is responsible for the global state, and the value for the 'reducer' key can be just one reducer or an object with multiple reducers that we name as we want (we give them the key names that we want), so we are creating a map of reducers). behind the scenes, configureStore will merge all these reducers into one big reducer:
// const store = configureStore({
// 	reducer: { counter: counterSlice.reducer },
// });
// but in our case, we only have one reducer, so we are going to assign this reducer to the main reducer of configureStore:
const store = configureStore({
	reducer: counterSlice.reducer,
});

export default store;

// if our app continues to grow (if we manage more and more state), we could face several problems: if you have many action identifiers ('type' properties), you can introduce bugs when typing them, or name clashing. another problem: the more data we manage, the bigger our state object becomes, and since we have to copy the whole object with every action type, the reducer function will become longer and longer, so you will end up with an unmaintainably big redux file (so we would have the same disadvantage that 'react context' has, ie. to put all in one long context provider file). another problem: you cannot mutate the existing state object, but you may accidentally mutate it if we have more complex data with nested objects, arrays, etc. For all these problems, in the past, we used different solutions. for example, defining and exporting/importing constants with the action identifiers, so the IDE will help you when using the constants, so you don't make mistakes while typing the action identifiers. for the other problems there are also solutions for splitting your reducer into other smaller reducers, and also from third party packages that ensure that you don't mutate existing state. but we don't need to do that anymore thanks to another library: redux toolkit. it will make working with redux easier and more convenient, easier to set up and maintain:
// npm install @reduxjs/toolkit
// when you install redux toolkit, you can uninstall redux, becuase it's already included in redux toolkit (you just remove it from package.json)
