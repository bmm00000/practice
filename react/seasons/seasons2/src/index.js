import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
	state = { lat: null, errMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errMessage: err.message })
		);
	}

	renderResults() {
		if (!this.state.lat && this.state.errMessage) {
			return <div>Error: {this.state.errMessage}</div>;
		}
		if (this.state.lat && !this.state.errMessage) {
			return <SeasonDisplay lat={this.state.lat} />;
		}
		return <Spinner message='This is the first message' />;
	}

	render() {
		return <div>{this.renderResults()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
