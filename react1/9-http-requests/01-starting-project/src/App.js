import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		// we clean up any error that we may have from before:
		setError(null);
		try {
			const response = await fetch('https://swapi.py4e.com/api/films');

			if (!response.ok) {
				throw new Error('Something went wrong...');
				// since we throw an error here, we will not continue in the 'try' block, but will get into the catch block, and the catch block will take this error.
			}

			const data = await response.json();

			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			// whenever an error is thrown in the 'try' block, we will catch it here.
			// one problem we have here is that the 'fetch' api doesn't treat the error status codes as real errors, so it will not throw a technical error if we get an error status code. we would only get the error when we try to apply the map method to data that we don't have (on the other hand, axios would treat the error code as real error). how to solve this problem of the 'fetch api? using the 'ok' property (you could also use the 'status' property) of the object that you get as a response (see above)
			// keep in mind that some apis also send json data even if the request was not successful, so you won't go through this error block, so you have to keep in mind the specificities of the api that you are working with.
			setError(error.message);
		}
		setIsLoading(false);
	}, []);
	// we have no external dependencies for useCallback (the 'fetch' api is a global browser api, so not a dependnecy)

	// we use useEffect to make the request after the component is rendered for the first time. after that, we will also make a request every time we press the button:
	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);
	// we add the function in the dependencies array, becuase if the function changes, the effect should be re-executed, and the function would change if we were using some external state on it. this doesn't happen in our case, but it's a good practice to include it in the dependencies array. the problem with that is that functions are objects (reference type) and the function will be re-created every time that the component is re-rendered, so we will create an infinite loop. one solution is just leave the dependencies array empty. however, this way it would be possible to introduce some bugs is the function was using some external state, so the better solution is to use the useCallback hook (note that, when using the useCallback hook, we usually use the arrow syntax for functions, or you could also use the keyword 'function' with an annonymous function assigned to a variable; keep in mind that, if we use the arrow function, the function will not hoist, so we will need to define it before useEffect. if we used the 'function' keyword, the function would hoist, so we could define it after useEffect).

	// function fetchMoviesHandler() {
	// 	fetch('https://swapi.py4e.com/api/films')
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((data) => {
	// 			const transformedMovies = data.results.map((movieData) => {
	// 				return {
	// 					id: movieData.episode_id,
	// 					title: movieData.title,
	// 					openingText: movieData.opening_crawl,
	// 					releaseDate: movieData.release_date,
	// 				};
	// 			});
	// 			setMovies(transformedMovies);
	// 		});
	// }
	// whe use '.then()' to define a function that will be called when the promised is resolved and we get a response, which will take some time (asyncronous js).
	// we could also use 'catch' after 'then' to handle any potential errors that are beyond our control, but for the moment we are not going to use it.
	// json is a very popular format to exchange data. it doesn't have methods, it's just data.
	// the 'response' object has a built in method that allows us to transform the json data into a js object: 'json()'. this returns a promise, and after that we add another 'then' block, which will be executed after the data transformation is done.

	// we can write the same function as above, using async/await instead of 'then' blocks:

	let content = <p>No movies here. Press fetch to get some movies!</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if (error) {
		content = <p>{error}</p>;
	}

	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
