import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList/MovieList";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox/SearchBox";
import AddToWatchList from "./components/AddToWatchList";
// import WatchList from './components/WatchList';
import Navigation from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import { BingeList, Donate, Home} from './components/pages';
import "./App.css";
import ViewOne from "./components/SingleMovie/View";
import SingleMovie from "./components/SingleMovie/";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [AddToWatch, setAddToWatch] = useState([]);
  const [ViewMovie, setViewMovie] = useState([]);

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
  };
  const newViewMovie = (movie) => {
    const ViewTheMovie = [...ViewMovie, movie];
    setViewMovie(ViewTheMovie);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app align-items-center mt-4 mb-4">
      <div className="row d-flex align-items-center mt-4 mb-4"></div>
      <div className="row">
        <MovieHeading heading="BingeWorthy" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="positioning">
          <Router>
            
        <Navigation />
              <Route path="/">
                <MovieList
                  movies={movies}
                  watchListComponent={AddToWatchList}
                  handleAddedMovieClick={newAddToWatch}
                  viewOneMovie={ViewOne}
                  handleViewMovieClick={newViewMovie}
                />
              </Route>
              <Route path="/movie/:movieID">
                <SingleMovie />
              </Route>
              {/* <Route path='Donate' <Donate />/> */}
            </Router>
        </div>
      </div>
    </div>
  );
};

export default App;
