import { useSelector, useDispatch } from 'react-redux';
// useSelector is a custom hook made by the react-redux team. we could also use useStore, but useSelector is more convenient, since it allows us to select a part of the state managed by the store. if we were using a class-based component, we would also need to import the 'connect' function to be used as a wrapper around the class-based component to connect that component to the store.

import { counterActions } from '../store/index-slice';
import classes from './Counter.module.css';

const Counter = () => {
	const dispatch = useDispatch();
	// the useDispatch hook will return a dispatch function that we can execute to dispatch an action against our redux store.
	const counter = useSelector((state) => state.counter);
	const show = useSelector((state) => state.showCounter);
	// we pass a function to useSelector that react-redux will execute and will determine which specific piece of data you want to extract from the whole store. when you use useSelector, react-redux will authomatically set up a subscription to the redux store for this component, so the component will be updated and will receive the latest state authomatically whenever the store data changes. if you were to unmount the Counter component, react-redux would also clear the subscription.

	const incrementHandler = () => {
		// dispatch({ type: 'increment' });
		dispatch(counterActions.increment());
	};

	const increaseHandler = () => {
		// dispatch({ type: 'increase', amount: 10 });
		// we are attaching a payload to the action. in this situation, we are hard coding it as 10, but this could come from an input, for example.
		dispatch(counterActions.increase(10));
		// to the 'increase' method above, we pass our payload data, and the payload that we pass will be in the 'payload' key of the created action, as follows: {type: 'auto-generated identifier', payload: 10}
	};

	const decrementHandler = () => {
		// dispatch({ type: 'decrement' });
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		// dispatch({ type: 'toggle' });
		dispatch(counterActions.toggleCounter());
	};
	// for the purposes of our demo, we are going to assume that the visibility of the counter is a piece of state that would also be interesting for other hypothetical components, that's why we are going to manage it as global state, and use redux for that.

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{show && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={increaseHandler}>Increment by 10</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
