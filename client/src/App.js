import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList/MovieList';
import MovieHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox/SearchBox';
import AddToWatchList from './components/AddToWatchList';
// import WatchList from './components/WatchList';
// import Navigation from './components/NavBar';
// import { HashRouter, Route, Routes } from "react-router-dom";
// import { BingeList, Donate, Home} from './components/pages';
import './App.css';


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
		// <div>
		// <div className="positioning">
		// <HashRouter>
		// 		<Navigation />
		// 		<Routes>
		// 			<Route path='/' element={<Home />} />
		// 			<Route path='BingeList' element={<BingeList />} />
		// 			<Route path='Donate' element={<Donate />} />
		// 		</Routes>
		// 		</HashRouter>
		// 		</div>
				

		<div className='container-fluid movie-app align-items-center mt-4 mb-4'>
				<MovieHeading heading='BingeWorthy' /> 
				
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />

			<div className='row d-flex align-items-center mt-4 mb-4'>
			</div>
			<div className='row'>
				<MovieList movies={movies} watchListComponent={AddToWatchList} handleAddedMovieClick={newAddToWatch}/>
			</div>
		</div>
		// </div>

	);
};

export default App;