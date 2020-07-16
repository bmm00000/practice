import React from 'react';
import ReactDOM from 'react-dom';
// import { ReactComponent } from '*.svg';

class App extends React.Component {
	constructor(props) {
		super(props);

		// this is the ONLY time we do direct assignment to this.state
		this.state = { lat: null, errorMessage: '' };

		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				// se call setState!!!, not this.state.lat = position.coords.latitude!!!!
				this.setState({ lat: position.coords.latitude });
			},
			(err) => {
				this.setState({ errorMessage: err.message });
			}
		);
	}

	componentDidMount() {
		console.log('My component was rendered');
	}

	componentDidUpdate() {
		console.log('My component was updated, re-rendered!');
	}

	// React says we have to define render!!
	render() {
		if (this.state.lat && !this.state.errorMessage) {
			return <div>Latitude: {this.state.lat}</div>;
		}

		if (!this.state.late && this.state.errorMessage) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		return <div>Loading...</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
