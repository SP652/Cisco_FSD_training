import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <h3>{movie.Title}</h3>
      <p>Genre: {movie.Genre}</p>
      <p>Rating: {movie.imdbRating}</p>
    </div>
  );
};

export default MovieCard;
