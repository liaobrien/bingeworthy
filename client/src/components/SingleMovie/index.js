import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import  App  from "./components/app.js";
// import MovieList from './components/MovieList/MovieList';
import MovieHeading from '../MovieHeading';
import SearchBox from '../SearchBox/SearchBox';
// import AddToWatchList from './components/AddToWatchList';
import { useParams } from "react-router-dom";


const SingleMovie = () => {
const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState( '' );
	const [AddToWatch, setAddToWatch] = useState([]);
	const [ViewMovie, setViewMovie] = useState([]);
    const {movieID} =useParams();

	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/i=${movieID}&apikey=b8d3ecea`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};


	const newAddToWatch = (movie) => {
		const newMovieAdded = [...AddToWatch, movie];
		setAddToWatch(newMovieAdded);
	}
	const newViewMovie = (movie) => {
		const ViewTheMovie = [...ViewMovie, movie];
		setViewMovie(ViewTheMovie);
	}

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

return (
 
  <div className="container-fluid movie-app align-items-center mt-4 mb-4">
    <MovieHeading heading="BingeWorthy" />

    <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

    <div className="row d-flex align-items-center mt-4 mb-4"></div>
    <div className="row">
      {/* <
        movies={movies}
        watchListComponent={AddToWatchList}
        handleAddedMovieClick={newAddToWatch}
      /> */}
      < {movie.Title}
    </div>
  </div>
);
}

export default SingleMovie;