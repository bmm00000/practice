const redux = require('redux');

// we need to give state a default value for the first time that counterReducer is executed when we initialize the store (the next times it's executed, it will take the pre-existing state, but we need some state for the first time):
const counterReducer = (state = { counter: 0 }, action) => {
	if (action.type === 'increment') {
		return {
			counter: state.counter + 1,
		};
	}

	if (action.type === 'decrement') {
		return {
			counter: state.counter - 1,
		};
	}
	// otherwise, if a different action (like the default initialization action) was dispatched, I want to return the unchanged state:
	return state;
};
// our goal when using redux is to do different things inside of the reducer depending on the different actions that are dispatched (that's why we get the 'action' as the second argument)

const store = redux.createStore(counterReducer);

// console.log(store.getState());
// we do this to verify that counterReducer has run for the first time when we initialized the store (createStore). (it would console.log {counter: 0})

const counterSubscriber = () => {
	const latestState = store.getState();
	console.log(latestState);
};

// we tell redux that the counterSubscriber function should be executed whenever our state changes:
store.subscribe(counterSubscriber);

// now we are going to dispatch an action. an action is a js object with a 'type' property that acts as an identifier (every different action being dispatched leads to different things being done in the reducer):
store.dispatch({ type: 'increment' });
// this will cause the reducer function to run again, hence the state will change, hence the counterSubscriber function will be executed. (hence, we will see consoledlog {counter: 1})
store.dispatch({ type: 'decrement' }); // {counter: 0}
