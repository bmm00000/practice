import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://react-http-requests-eabc8-default-rtdb.europe-west1.firebasedatabase.app/movies.json'
				// when using firebase, we need to add 'whateverNameWeWant.json' as a path to the url provided by firebase. this name will create a new node in the database. this is a dynamic rest api which you can configure here by using different segments to store data in different nodes of your database. and firebase requests that name to be followed by '.json'. otherwise the request will fail.
			);
			// we were experimenting with this rest api backend to send GET requests: 'https://swapi.dev/api/films/'
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			const loadedMovies = [];
			for (let key in data) {
				loadedMovies.push({
					id: key,
					title: data[key].title,
					openingText: data[key].openingText,
					releaseDate: data[key].releaseDate,
				});
			}

			setMovies(loadedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	async function addMovieHandler(movie) {
		const response = await fetch(
			'https://react-http-requests-eabc8-default-rtdb.europe-west1.firebasedatabase.app/movies.json',
			{
				method: 'POST',
				body: JSON.stringify(movie),
				headers: { 'Content-Type': 'application/json' },
			}
		);
		// keep in mind that we can also use 'fetch' for post requests, but these will require an object as second argument (watch out, this will work with firebase, but you will need to check that this works with any other apis). we will add the resource to be stored in the 'body' of the fetch api configuration object. the 'body' expects data in json format, that's why we will use the utility method which exists in JS: we use the JSON object, which is built into browser side JS, and call 'stringify' (this will take a js object and convert it into json format). technically, the header that we are using is not required by firebase, but a lot of apis that you might be using might require this header, which describes the content that will be sent.

		// firebase sends back data in json format:
		const data = await response.json();
		console.log(data);
		// keep in mind that we could also use try/catch here to handle any errors, but we won't do it keep this short and focused.
	}

	let content = <p>Found no movies.</p>;

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
				<AddMovie onAddMovie={addMovieHandler} />
			</section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
