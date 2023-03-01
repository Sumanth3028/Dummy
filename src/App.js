import React, { useState, useCallback, useEffect } from "react";

import MoviesList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const tranformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(tranformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>No movies found</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  let id;
  if (error) {
    content = (
      <p>
        {error} <b>...Retrying</b>
      </p>
    );

    id = setTimeout(fetchMoviesHandler, 5000);
  }

  if (isLoading) {
    content = <p>Loading..</p>;
  }

  const stopHandler = () => {
    setError(null);
    clearTimeout(id);
  };

  return (
    <React.Fragment>
      <MovieForm />
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {error && <button onClick={stopHandler}>cancel</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
