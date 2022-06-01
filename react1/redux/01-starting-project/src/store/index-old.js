import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
	if (action.type === 'increment') {
		return { counter: state.counter + 1, showCounter: state.showCounter };
		// remember, the objects returned as new state will not merge into the former state, but will override it! that's why we need to add all the properties of our state object in all the 'if' statements, even if we don't change them (otherwise those pieces of state will be deleted).

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
