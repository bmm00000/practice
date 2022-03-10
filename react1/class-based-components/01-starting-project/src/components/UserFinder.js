import { Fragment, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
	static contextType = UsersContext;
	// you are telling that this component should have access to the UsersContext, but you can only set the static contextType property ONCE. if you need to access another context here, you will need to find another workaround, like wrapping it in another component, or similar...

	constructor() {
		super();
		this.state = { filteredUsers: [], searchTerm: '' };
		// pay attention at how you access the context in the above lines.
	}

	// this method will be called by react after the component has been rendered for the first time. This will be useful if we want to fetch our users from a database or something (we don't want to fetch them every time the component re-renders, but only the first time) (the equivalent for a functional component would be useEffect with an empty dependencies array):
	componentDidMount() {
		// send http request...
		this.setState({ filteredUsers: this.context.users });
	}

	// this method will be called by react every time that the component has been re-evaluated (the equivalent for a functional component would be useEffect with searchTerm in the dependencies array):
	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: prevState.filteredUsers.filter((user) =>
					user.name.includes(this.state.searchTerm)
				),
			});
		}
		// componentDidUpdate can receive two arguments: previous props and previous state. if  we don't use them, we will generate an infinite loop here. this 'if' check is very usual with lifecycle methods in order to avoid infinite loops.
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		return (
			<Fragment>
				<div className={classes.finder}>
					<input type='search' onChange={this.searchChangeHandler.bind(this)} />
				</div>
				<ErrorBoundary>
					<Users users={this.state.filteredUsers} />
				</ErrorBoundary>
			</Fragment>
		);
	}
}

// const UserFinder = () => {
// 	const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
// 	const [searchTerm, setSearchTerm] = useState('');

// 	useEffect(() => {
// 		setFilteredUsers(
// 			DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
// 		);
// 	}, [searchTerm]);

// 	const searchChangeHandler = (event) => {
// 		setSearchTerm(event.target.value);
// 	};

// 	return (
// 		<Fragment>
// 			<div className={classes.finder}>
// 				<input type='search' onChange={searchChangeHandler} />
// 			</div>
// 			<Users users={filteredUsers} />
// 		</Fragment>
// 	);
// };

export default UserFinder;
