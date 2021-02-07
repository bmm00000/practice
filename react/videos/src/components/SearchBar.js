import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onInputChange = (e) => {
		this.setState({ term: e.target.value });
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		// TODO: callback from parent component
	};

	render() {
		return (
			<div className='ui segment search-bar'>
				<form action='' className='ui form' onSubmit={this.onFormSubmit}>
					<div className='field'>
						<label htmlFor=''>Video Search</label>
						<input
							type='text'
							onChange={this.onInputChange}
							value={this.state.term}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
