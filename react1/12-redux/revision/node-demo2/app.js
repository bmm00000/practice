const redux = require('redux');

const initialCounterState = { counter: 0 };

const counterReducer = (state = initialCounterState, action) => {
	if (action.type === 'INCREMENT') {
		return { counter: state.counter + 1 };
	}

	if (action.type === 'DECREMENT') {
		return { counter: state.counter - 1 };
	}

	return { ...state };
};

const store = redux.createStore(counterReducer);

// console.log(store.getState());

const counterSubscriber = () => {
	console.log(store.getState());
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
