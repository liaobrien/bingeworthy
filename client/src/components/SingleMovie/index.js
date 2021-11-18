import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import  App  from "./components/app.js";
// import MovieList from './components/MovieList/MovieList';
import MovieHeading from '../MovieHeading';
import SearchBox from '../SearchBox/SearchBox';
// import AddToWatchList from './components/AddToWatchList';
import { useParams } from "react-router-dom";


const SingleMovie = () => {
    const [movies, setMovies] = useState({});
	const [searchValue, setSearchValue] = useState( '' );
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
    
    console.log(movies)

	const newAddToWatch = (movie) => {
		const newMovieAdded = [...AddToWatch, movie];
		setAddToWatch(newMovieAdded);
	}
	const newViewMovie = (movie) => {
		const ViewTheMovie = [...ViewMovie, movie];
		setViewMovie(ViewTheMovie);
	}

	
    useEffect(() => {
		OneMovieRequest(movieID);
	}, {movieID});

return (
 
  <div className="container-fluid movie-app align-items-center mt-4 mb-4">
    
    <div className="row d-flex align-items-center mt-4 mb-4"></div>
    <div className="row">
      {/* <
        movies={movies}
        watchListComponent={AddToWatchList}
        handleAddedMovieClick={newAddToWatch}
      /> */}
      <div className="text-center">
      <img
        alt={movies.Title}
        className="img-fluid"
        src={movies.Poster}
        style={{ margin: '0 auto' }}
      />
      <h1> Movie Title: {movies.Title}</h1>
      <h3>Rated: {movies.Rated}</h3>
      <h3>IMDB Rating: {movies.imdbRating}</h3>
      <h3>Genre: {movies.Genre}</h3>
      <h3>Released: {movies.Released}</h3>
      <h3>RunTime: {movies.Runtime}</h3>
      <h3>Actors: {movies.Actors}</h3>
      <h3>Director: {movies.Director}</h3>
      <h3>Movie Plot: {movies.Plot}</h3>
      <h3>Awards: {movies.Awards}</h3>

      
      
    </div>

    </div>
  </div>
);
}

export default SingleMovie;