import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
	constructor() {
		// we need to call the constructor of the class that we are inheriting from, ie. 'Component', that's why we call super():
		super();
		// when we initialize state, we have to use the property 'state', and all the state pieces have to be in an object.
		this.state = { showUsers: true, more: 'Test' };
	}

	componentDidUpdate() {
		// this error will bubble up the call stack: it will pass all components, and if it's not handled anywhere, it will crash your app. if you don't want your whole app to crash if this error happens, in js we use 'try' and 'catch':
		// try {
		// 	// someCodeWhichMightFail()
		// } catch (err) {
		// 	// handle error
		// }
		// however, if an error is generated inside of a component, and we can't handle it inside this component, but we want to handle it in a parent component instead, then we can't use 'try' and 'catch'. in that case, we can use an error boundary (see the other component called ErrorBoundary.js: this is a class-based component that implements the componentDidCatch lifecycle method)
		if (this.props.users.length === 0) {
			throw new Error('No users provided!');
		}
	}

	toggleUsersHandler() {
		// DO NOT DO THIS to update state: this.state.showUsers = false
		this.setState((curState) => {
			return { showUsers: !curState.showUsers };
		});
		// note that setState will always take an object as an argument, and this new state will not override the former one, but will be merged into it, so in the new state we will also have the 'more' property (also, in this case, since our new state will depend on the former one, we also use the function format to update state)
	}

	render() {
		const usersList = (
			<ul>
				{this.props.users.map((user) => (
					<User key={user.id} name={user.name} />
				))}
			</ul>
		);

		return (
			<div className={classes.users}>
				{/* we have to make sure that 'this' refers to the class that we are in, and this wouldn't happen with the 'this' inside the toggleUsersHandler method, when it's called upon the onClick event (the invocation context would be the button, so 'this' inside toggleUsersHandler would be the button). that's why we use the 'bind' method (the 'bind' method ensures that 'this' inside toggleUsersHandler is the same as the 'this' that we use as an argument to the 'bind' method): */}
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{this.state.showUsers ? 'Hide' : 'Show'} Users
				</button>
				{this.state.showUsers && usersList}
			</div>
		);
	}
}

// const Users = () => {
// 	const [showUsers, setShowUsers] = useState(true);

// 	const toggleUsersHandler = () => {
// 		setShowUsers((curState) => !curState);
// 	};

// 	return (
// 		<div className={classes.users}>
// 			<button onClick={toggleUsersHandler}>
// 				{showUsers ? 'Hide' : 'Show'} Users
// 			</button>
// 			{showUsers && usersList}
// 		</div>
// 	);
// };

export default Users;
