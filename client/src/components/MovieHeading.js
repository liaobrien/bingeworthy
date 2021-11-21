import React from 'react';

const MovieHeading = (props) => {
	return (
		<div className='col d-flex justify-content-center mb-5'>
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieHeading;