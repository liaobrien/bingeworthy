import React from "react";
import MovieList from "./components/MovieList";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import AddToWatchList from "./components/AddToWatchList";

const ViewMovie = () => {
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Your BingeWorthy Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4"></div>
      <div className="row">
        <MovieList movies={AddToWatch} watchListComponent={AddToWatchList} />
      </div>
    </div>
  );
};

export default ViewMovie;
