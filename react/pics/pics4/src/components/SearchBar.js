import React from 'react';

class SearchBar extends React.Component {
	state = { term: '' };

	onFormSubmit = (e) => {
		e.preventDefault();
		this.props.onSearchSubmit(this.state.term);
	};

	render() {
		return (
			<div className='ui segment'>
				<form action='' className='ui form' onSubmit={this.onFormSubmit}>
					<div className='field'>
						<label htmlFor='term'>Search images:</label>
						<input
							type='text'
							id='term'
							value={this.state.term}
							onChange={(e) => this.setState({ term: e.target.value })}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default SearchBar;
