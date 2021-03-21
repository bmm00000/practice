import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onSearchSubmit = (e) => {
		e.preventDefault();
		this.props.onTermSearch(this.state.term);
	};

	render() {
		return (
			<div className='ui segment search-bar'>
				<form action='' className='ui form' onSubmit={this.onSearchSubmit}>
					<div className='field'>
						<label htmlFor='search'>Search:</label>
						<input
							type='text'
							id='search'
							onChange={(e) => this.setState({ term: e.target.value })}
							value={this.state.term}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
