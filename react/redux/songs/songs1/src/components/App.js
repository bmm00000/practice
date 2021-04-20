import React from 'react';
import { selectSong } from '../actions';
// we can just type '../actions' because the name of the file is index.js (if you specify just the directory, Webpack gives you the 'index.js' file)
// we use {} when we import 'named exports'

const App = () => {
	return <div>App</div>;
};

export default App;
