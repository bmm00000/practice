const redux = require('redux');

const counterReducer = (state, action) => {
	if (action.type === 'INCREMENT') {
		return { counter: state.counter + 1 };
	}

	return { counter: 0 };
};

const store = redux.createStore(counterReducer);

// console.log(store.getState());

const counterSubscriber = () => {
	console.log(store.getState());
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'ANOTHER' });
