import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);

	// const dummyMovies = [
	//   {
	//     id: 1,
	//     title: 'Some Dummy Movie',
	//     openingText: 'This is the opening text of the movie',
	//     releaseDate: '2021-05-18',
	//   },
	//   {
	//     id: 2,
	//     title: 'Some Dummy Movie 2',
	//     openingText: 'This is the second opening text of the movie',
	//     releaseDate: '2021-05-19',
	//   },
	// ];

	function fetchMoviesHandler() {
		fetch('https://swapi.py4e.com/api/films')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const transformedMovies = data.results.map((movieData) => {
					return {
						id: movieData.episode_id,
						title: movieData.title,
						openingText: movieData.opening_crawl,
						releaseDate: movieData.release_date,
					};
				});
				setMovies(transformedMovies);
			});
		// whe use '.then()' to define a function that will be called when the promised is resolved and we get a response, which will take some time (asyncronous js).
		// we could also use 'catch' after 'then' to handle any potential errors that are beyond our control, but for the moment we are not going to use it.
		// json is a very popular format to exchange data. it doesn't have methods, it's just data.
		// the 'response' object has a built in method that allows us to transform the json data into a js object: 'json()'. this returns a promise, and after that we add another 'then' block, which will be executed after the data transformation is done.
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={movies} />
			</section>
		</React.Fragment>
	);
}

export default App;
