import { Component } from 'react';

import classes from './User.module.css';

class User extends Component {
	// in the dev tools, when you click the button to hide the users, the following will be consoled log three times, since you have three users:
	componentWillUnmount() {
		console.log('User will unmount');
	}
	// 'render' is the method that react will call, when a custom component is used in jsx code
	render() {
		return <li className={classes.user}>{this.props.name}</li>;
		// you can access this.props because you are extending Component
	}
}

// const User = (props) => {
// 	return <li className={classes.user}>{props.name}</li>;
// };

export default User;
