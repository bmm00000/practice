import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}

	componentDidCatch(error) {
		console.log(error);
		// apart from consoling log the error, we could also send the error to a server for analytics or whatever...
		this.setState({ hasError: true });
	}
	// whenever you add the componentDidCatch lifecycle method to a class-baed component, it makes that component an error boundary (you cannot add it to functional components, and there is no equivalent for functional components)
	// the componentDidCatch lifecycle method will be triggered whenever one of the child components throws an error. therefore, we want to wrap this component around child components which might throw errors that we want to handle (in our case, see UserFinder)

	render() {
		if (this.state.hasError === true) {
			return <p>Something went wrong!</p>;
			// it might happen that the former paragraph will not appear, and react will throw the whole error on the screen (react does this to make sure developers know that an error ocurred), but we will get the message that 'this screen is only visible in development. it will not appear if the app crashes in production', and you will be able to close this overlay too.
		}
		return this.props.children;
	}
}

export default ErrorBoundary;

// the idea of error boundaries is to make sure that if something wrong happens, your whole application doesn't crash, but instead you can catch those errors and handle them in an elegant way, the same way that you would do with 'try' and 'catch' in regular JS. You can build error boundaries only with class-based components, not possible with functional components.
