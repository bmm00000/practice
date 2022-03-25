import { createStore } from 'redux';

const counterReducer = (state = { counter: 0 }, action) => {
	if (action.type === 'increment') {
		return { counter: state.counter + 1 };
	}

	if (action.type === 'decrement') {
		return { counter: state.counter - 1 };
	}

	return state;
};

const store = createStore(counterReducer);

// previously, we did subscribe and dispatch form the same file (in node), but now we want to connect our react app to this redux store, so that the components of our app can dispatch and listen. that's why we export the store, so that we can use it outside of this file, and then we will connect our react app to this store (we need to provide this store to the react app (since in redux we only have one store, we only need to provide it once), but what does provide mean?):
export default store;
