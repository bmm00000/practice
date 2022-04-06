import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
// import store from './store/index';
import store from './store/index-slice';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
// you don't need to necessarily wrap the whole App with the Provider, you could also do so with any of the child components, but keep in mind that only the wrapped components (and their children) will have access to the redux store.
