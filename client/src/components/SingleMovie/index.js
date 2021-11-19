import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieHeading from "../MovieHeading";
import SearchBox from "../SearchBox/SearchBox";
import AddToWatchList from "../AddToWatchList";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SingleMovie = () => {
  const [movies, setMovies] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [AddToWatch, setAddToWatch] = useState([]);
  const [ViewMovie, setViewMovie] = useState([]);
  const { movieID } = useParams();

  const OneMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?i=${movieID}&apikey=b8d3ecea`;

    const response = await fetch(url);
    const responseJson = await response.json();

    console.log(responseJson);
    if (responseJson) {
      setMovies(responseJson);
    }
  };

  console.log(movies);

  const newAddToWatch = (movie) => {
    const newMovieAdded = [...AddToWatch, movie];
    setAddToWatch(newMovieAdded);
  };
  const newViewMovie = (movie) => {
    const ViewTheMovie = [...ViewMovie, movie];
    setViewMovie(ViewTheMovie);
  };

  useEffect(
    () => {
      OneMovieRequest(movieID);
    },
    { movieID }
  );

  return (
    <div className="container-fluid movie-app align-items-center mt-4 mb-4">
      <div className="row d-flex align-items-center mt-4 mb-4"></div>
      <div className="row">
        <div className="text-left">
          <img
            alt={movies.Title}
            className="img-fluid"
            src={movies.Poster}
            style={{ margin: "0 auto" }}
          />

          <h1 class="text-primary">
            {" "}
            Movie Title:<span class="text-white"> {movies.Title}</span>
          </h1>
          <h4 class="text-primary">
            Rated: <span class="text-white"> {movies.Rated}</span>
          </h4>
          <h4 class="text-primary">
            IMDB Rating: <span class="text-white">{movies.imdbRating}</span>
          </h4>
          <h4 class="text-primary">
            IMDB Rating:<span class="text-white"> {movies.imdbRating}</span>
          </h4>
          <h4 class="text-primary">
            Genre:<span class="text-white"> {movies.Genre}</span>
          </h4>
          <h4 class="text-primary">
            Released:<span class="text-white"> {movies.Released}</span>
          </h4>
          <h4 class="text-primary">
            RunTime:<span class="text-white"> {movies.Runtime}</span>
          </h4>
          <h4 class="text-primary">
            Actors:<span class="text-white"> {movies.Actors}</span>
          </h4>
          <h4 class="text-primary">
            Director: <span class="text-white">{movies.Director}</span>
          </h4>
          <h4 class="text-primary">
            Movie Plot: <span class="text-white">{movies.Plot}</span>
          </h4>
          <h4 class="text-primary">
            Awards:<span class="text-white"> {movies.Awards}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
