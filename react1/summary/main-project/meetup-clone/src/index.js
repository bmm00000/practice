import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// BrowserRounter is a component itself, that's why we include it as JSX below in ReactDOM.render (we initialize the router package, so we make sure it watches our url)

import './index.css';
import App from './App';
// you put 'FavoritesContextProvider' between curly braces, because you don't want the default export ('FavoritesContext') (we import named exports between curly braces, that's standard JS):
import { FavoritesContextProvider } from './store/favorites.context';

ReactDOM.render(
	<FavoritesContextProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</FavoritesContextProvider>,
	document.getElementById('root')
);
// now all the components of the entire app are able to interact with the 'context'
