import React from 'react';
import MovieCard from './src/MovieCard';

const MovieList = ({ movies }) => {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
