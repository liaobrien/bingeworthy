import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieHeading from "./components/MovieHeading";
import MovieList from "./components/MovieList";

const BingeList = () => {

    const [AddToWatch, setAddToWatch] = useState([]);

    const newAddToWatch = (movie) => {
		const newMovieAdded = [...AddToWatch, movie];
		setAddToWatch(newMovieAdded);
	}

    return(
        <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieHeading heading="Your BingeWorthy Movies" />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4"></div>
      <div className="row">
        <MovieList movies={AddToWatch}/> 
      </div>
    </div>
  );
};

export default BingeList;