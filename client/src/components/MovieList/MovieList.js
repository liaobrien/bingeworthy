import React from "react";
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const WatchListComponent = props.watchListComponent;
  const ViewOneMovie = props.viewOneMovie;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <Link
            // to={`/movie/${listID}`}
            className="overlay d-flex align-items-center justify-content-center"
            id="add"
          >
            <WatchListComponent />
          </Link>
          <Link
            to={`/movie/${movie.imdbID}`}
            className="overlay2 d-flex align-items-center justify-content-center"
            id="view"
          >
            <ViewOneMovie />
          </Link>
        </div>
      ))}
    </>
  );
};

export default MovieList;
