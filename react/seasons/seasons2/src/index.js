import React from 'react';
import ReactDOM from 'react-dom';
import DisplaySeason from './DisplaySeason';
import Spinner from './Spinner';

class App extends React.Component {
	state = { lat: null, errMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => this.setState({ lat: position.coords.latitude }),
			(err) => this.setState({ errMessage: err.message })
		);
	}

	contentToRender() {
		if (!this.state.lat && this.state.errMessage) {
			return <div>Error: {this.state.errMessage}</div>;
		}
		if (this.state.lat && !this.state.errMessage) {
			return <DisplaySeason lat={this.state.lat} />;
		}
		return <Spinner message='Please let me get your location...' />;
	}

	render() {
		return <div>{this.contentToRender()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));
