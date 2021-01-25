import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { lat: null, errMessage: '' };

		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({ lat: position.coords.latitude });
			},
			(err) => {
				this.setState({ errMessage: err.message });
			}
		);
	}
	// React says we have to define 'render'!
	render() {
		return (
			<div>
				Latitude: {this.state.lat} <br />
				Error: {this.state.errMessage}
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
