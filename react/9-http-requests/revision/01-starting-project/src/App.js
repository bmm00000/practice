import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('https://swapi.py4e.com/api/films');

			if (!response.ok) {
				throw new Error('We got an error!');
			}

			const data = await response.json();
			const transformedMovies = data.results.map((movie) => {
				return {
					id: movie.episode_id,
					title: movie.title,
					releaseDate: movie.release_date,
					openingText: movie.opening_crawl,
				};
			});

			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		getMoviesHandler();
	}, [getMoviesHandler]);

	let content = <p>There are no movies!</p>;
	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}
	if (error) {
		content = <p>{error}</p>;
	}
	if (isLoading) {
		content = <p>We are loading, please wait!</p>;
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={getMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
