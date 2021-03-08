import React from 'react';
import ReactDOM from 'react-dom';
import DisplaySeason from './DisplaySeason';
import Spinner from './Spinner';

class App extends React.Component {
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(error) => this.setState({ errorMessage: error.message })
		);
	}

	renderContent() {
		if (!this.state.lat && this.state.errorMessage) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		if (this.state.lat && !this.state.errorMessage) {
			return <DisplaySeason lat={this.state.lat} />;
		}

		return <Spinner />;
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
