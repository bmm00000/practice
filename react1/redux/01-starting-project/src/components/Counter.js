import { useSelector, useDispatch } from 'react-redux';
// useSelector is a cumstom hook made by the react-redux team. we could also use useStore, but useSelector is more convenient, since it allows us to select a part of the state managed by the store. if we were using class-based component, we would also need to import the 'connect' function to be used as a wrapper around the class-based component to connect that component to the store.

import classes from './Counter.module.css';

const Counter = () => {
	const dispatch = useDispatch();
	// the useDispatch hook will return a dispatch function that we can execute to dispatch an action against our redux store.
	const counter = useSelector((state) => state.counter);
	// we pass a function to useSelector that react-redux will execute and will determine which specific piece of data you want to extract from the whole store. when you use useSelector, react-redux will authomatically set up a subscription to the redux store for this component, so the component will be updated and will receive the latest state authomatically whenever the store data changes. if you were to unmount the Counter component, react-redux would also clear the subscription.

	const incrementHandler = () => {
		dispatch({ type: 'increment' });
	};

	const decrementHandler = () => {
		dispatch({ type: 'decrement' });
	};

	const toggleCounterHandler = () => {};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			<div className={classes.value}>{counter}</div>
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
