import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox';
import AddToWatchList from './components/AddToWatchList';
import ViewMovie from './components/ViewMovie';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState( '' );
	const [AddToWatch, setAddToWatch] = useState([]);

	const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b8d3ecea`;

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

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieHeading heading='BingeWorthy' />
				<button className='btn btn-primary' onClick={ViewMovie}> Your BingeWorthy Movies </button>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList movies={movies} watchListComponent={AddToWatchList} handleAddedMovieClick={newAddToWatch}/>
			</div>
		</div>

	);
};

export default App;