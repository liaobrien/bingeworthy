import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { ADD_MOVIE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";

const SingleMovie = () => {
    const [movies, setMovies] = useState({});
    const { movieID } = useParams();
    const [addMovie, { error }] = useMutation(ADD_MOVIE);

    const OneMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?i=${movieID}&${process.env.REACT_APP_API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
        setMovies(responseJson);
    }
    };

    useEffect(() => {
        OneMovieRequest(movieID);
    }, [movieID]);

    const handleAddMovie = async (movies) => {
        await addMovie({
            variables: {
                movieInput: {
                    imdbID: movies.imdbID,
                    title: movies.Title,
                    runtime: movies.Runtime,
                    releaseDate: movies.Released,
                    actors: movies.Actors,
                    director: movies.Director,
                    poster: movies.Poster,
                    plot: movies.Plot,
                    imdbRating: movies.imdbRating,
                    genre: movies.Genre,
                    rated: movies.Rated,
                    watched: false,
                },
            },
        });
        window.location.reload();
    };
    return (
        <div className="container-fluid d-flex justify-content-center flex-wrap">
            <h1 className="text-primary mt-1 col-12 text-center">
                <span className="text-white"> {movies.Title}</span>
            </h1>
            <div className="container col-12 movie-app align-items-center d-flex flex-wrap justify-content-center mt-4 mb-4">
                <div className="col-lg-4 col-md-8 col-sm-8 col-12 d-flex justify-content-center my-2">
                    <img
                        alt={movies.Title}
                        className="img-fluid"
                        src={movies.Poster}
                        />
                </div>
                <div className="col-lg-4 col-md-8 col-sm-8 col-12 text-center px-3 my-2">
                    <div className="text-primary">
                        <h3>Summary</h3>
                        <h4 className="text-white">{movies.Plot}</h4>
                    </div>
                    {Auth.loggedIn() 
                        ? <button
                            type="button"
                            className="btn btn-danger mt-2"
                            onClick={() => handleAddMovie(movies)}
                            >
                            Add To List
                            </button> 
                        : ``
                    } 
                </div>
                <div className="col-lg-4 col-md-8 col-sm-8 col-12 text-center px-3 my-3">
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
                        Awards:<span className="text-white"> {movies.Awards}</span>
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default SingleMovie;
