import { Component } from 'react';
import { connect } from 'react-redux';
// the 'connect' function will help you connect components to redux. you could also use the 'connect' function in functional components, but if you have functional components, using hooks is more convenient.

import classes from './Counter.module.css';

class Counter extends Component {
	incrementHandler() {
		this.props.increment();
	}

	decrementHandler() {
		this.props.decrement();
	}

	toggleCounterHandler() {}

	render() {
		return (
			<main className={classes.counter}>
				<h1>Redux Counter</h1>
				<div className={classes.value}>{this.props.counter}</div>
				<div>
					<button onClick={this.incrementHandler.bind(this)}>Increment</button>
					<button onClick={this.decrementHandler.bind(this)}>Decrement</button>
				</div>
				<button onClick={this.toggleCounterHandler}>Toggle Counter</button>
			</main>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		counter: state.counter,
	};
	// the keys of this object will be available as props in the receiving component.
};

const mapDispatchToProps = (dispatch) => {
	return {
		increment: () => dispatch({ type: 'increment' }),
		decrement: () => dispatch({ type: 'decrement' }),
	};
	// the 'dispatch' function is received as an argument authomatically
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// 'connect' will return a new function, which we will execute again passing our component as an argument ('connect' is a so-called 'higher order function').
// 'connect' expects two arguments that must be functions: the first function maps redux state to props to be received in the component (the name that is conventionally used is 'mapStateToProps'), and the second function (the name that is conventionally used is 'mapDispatchToProps'; it's the equivalent to useDispatch) stores dispatch functions in props.
// when using 'connect', react-redux will set up a subscription and manage it for us.
