import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
// import { useQuery } from "react-query"
// import UserMovieList from "../MovieList/bingeworthy"
import { ADD_MOVIE } from "../../utils/mutations"



const SingleMovie = () => {
  const [movies, setMovies] = useState({});
  const { movieID } = useParams();


  

  const OneMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?i=${movieID}&${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json();
    
    if (responseJson) {
      setMovies(responseJson);
    }
  };
  
  
  useEffect(
    () => {
      OneMovieRequest(movieID);
    },
    [ movieID ]
    
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
        <button type="button" class="btn btn-danger" onclick={ADD_MOVIE}>Add To List</button>
        
          <h1 class="text-primary">
  
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
