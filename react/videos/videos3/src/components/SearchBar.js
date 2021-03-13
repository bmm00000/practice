import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onInputChange = (e) => {
		this.setState({ term: e.target.value });
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		this.props.onSearchSubmit(this.state.term);
	};

	render() {
		return (
			<div className='ui segment search-bar'>
				<form action='' className='ui form' onSubmit={this.onFormSubmit}>
					<div className='field'>
						<label htmlFor='term'>Search videos:</label>
						<input
							type='text'
							id='term'
							value={this.state.term}
							onChange={this.onInputChange}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
