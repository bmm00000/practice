import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
// import { ReactComponent } from '*.svg';

class App extends React.Component {
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errorMessage: err.message })
		);
	}

	componentDidUpdate() {
		console.log('My component was updated, re-rendered!');
	}

	contentToRender() {
		if (this.state.lat && !this.state.errorMessage) {
			return <SeasonDisplay lat={this.state.lat} />;
		}

		if (!this.state.late && this.state.errorMessage) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		return <Spinner message="Please accept location request" />;
	}

	render() {
		return <div className="border red">{this.contentToRender()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
