import React, { Component } from 'react';
import Navbar from './components/layouts/Navbar';
import Users from './components/users/Users';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar title='Github Finder' icon='fa fa-github' />
				<div className='container'>
					<Users />
				</div>
			</div>
		);
	}
}

export default App;
