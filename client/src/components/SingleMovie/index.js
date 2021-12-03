import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { ADD_MOVIE } from "../../utils/mutations"
import { useMutation } from '@apollo/client'



const SingleMovie = () => {
  const [movies, setMovies] = useState({});
  const { movieID } = useParams();
  const [addMovie, {error}] = useMutation(ADD_MOVIE)
  

  const OneMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?i=${movieID}&${process.env.REACT_APP_API_KEY}`;

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
    
    const handleAddMovie = async (movies) => {
      await addMovie({
        variables: {
          "movieInput": {
            "imdbID": movies.imdbID,
            "title": movies.Title,
            "runtime": movies.Runtime,
            "releaseDate": movies.Released,
            "actors": movies.Actors,
            "director": movies.Director,
            "poster": movies.Poster,
            "plot": movies.Plot,
            "imdbRating": movies.imdbRating,
            "genre": movies.Genre,
            "rated": movies.Rated,
            "watched": false
          }
        }
      })
      window.location.reload();
    }
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
        <button type="button" className="add-movie-btn btn btn-danger" onClick={()=> handleAddMovie(movies)}>Add To List</button>
        
          <h1 className="text-primary mt-1">
  
            Movie Title:<span className="text-white"> {movies.Title}</span>
          </h1>
          <h4 className="text-primary">
            Rated: <span className="text-white"> {movies.Rated}</span>
          </h4>
          <h4 className="text-primary">
            IMDB Rating: <span className="text-white">{movies.imdbRating}</span>
          </h4>
          <h4 className="text-primary">
            Genre:<span className="text-white"> {movies.Genre}</span>
          </h4>
          <h4 className="text-primary">
            Released:<span className="text-white"> {movies.Released}</span>
          </h4>
          <h4 className="text-primary">
            RunTime:<span className="text-white"> {movies.Runtime}</span>
          </h4>
          <h4 className="text-primary">
            Actors:<span className="text-white"> {movies.Actors}</span>
          </h4>
          <h4 className="text-primary">
            Director: <span className="text-white">{movies.Director}</span>
          </h4>
          <h4 className="text-primary">
            Movie Plot: <span className="text-white">{movies.Plot}</span>
          </h4>
          <h4 className="text-primary">
            Awards:<span className="text-white"> {movies.Awards}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;
