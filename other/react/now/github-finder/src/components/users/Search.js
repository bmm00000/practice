import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
	state = {
		text: ''
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.searchUsers(this.state.text); //we are sending this prop up to 'App'.
		this.setState({ text: '' });
	};
	// we are using arrow functions to avoid problems with 'this'

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form'>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input type='submit' value='Search' className='btn btn-dark btn-block' />
				</form>
				{this.props.showClear && (
					<button className='btn btn-light btn-block' onClick={this.props.clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}
}
//if the condition is true ('&&') then we show the button

export default Search;
