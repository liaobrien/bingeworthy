import React from "react";
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const ViewOneMovie = props.viewOneMovie;

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-center m-3 ">
          <img src={movie.Poster} alt="movie"></img>
          <Link
            to={`/movie/${movie.imdbID}`}
            className="overlay2 d-flex align-items-center justify-content-center"
            id="view"
          >
            <ViewOneMovie />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
