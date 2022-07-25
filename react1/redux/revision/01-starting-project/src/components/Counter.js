import { useSelector, useDispatch } from 'react-redux';
// import { Component } from 'react';
// import { connect } from 'react-redux';

import { counterActions } from '../store';

import classes from './Counter.module.css';

const Counter = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter);
	const showCounter = useSelector((state) => state.showCounter);

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};

	const incrementByPayloadHandler = () => {
		dispatch(counterActions.incrementByPayload(10));
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggle());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{showCounter && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={incrementByPayloadHandler}>Increment by 10</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;

// class Counter extends Component {
// 	incrementHandler() {
// 		this.props.increment();
// 	}

// 	decrementHandler() {
// 		this.props.decrement();
// 	}

// 	render() {
// 		return (
// 			<main className={classes.counter}>
// 				<h1>Redux Counter</h1>
// 				<div className={classes.value}>{this.props.counter}</div>
// 				<div>
// 					<button onClick={this.incrementHandler.bind(this)}>Increment</button>
// 					<button onClick={this.decrementHandler.bind(this)}>Decrement</button>
// 				</div>
// 				<button>Toggle Counter</button>
// 			</main>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return { counter: state.counter };
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		increment: () => dispatch({ type: 'INCREMENT' }),
// 		decrement: () => dispatch({ type: 'DECREMENT' }),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
