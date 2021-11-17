import React from 'react';

const MovieList = (props) => {
	const WatchListComponent = props.watchListComponent;
	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div
					onClick={()  => props.handleAddedMovieClick(movie)}
					className='overlay d-flex align-items-center justify-content-center' id="add">
						<WatchListComponent/>
					</div>
					<div className='overlay2 d-flex align-items-center justify-content-center' id="view">
						View
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;