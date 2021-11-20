// import React, { useState } from 'react';
// import SingleMovie from '../SingleMovie';
// import { useQuery } from "react-query"

// const UserMovieList = () => {
//     const [movieList, setMovieList] = useState([]);
//     const response = useQuery("movieData", OneMovieRequest);
    

//     const { data } = useQuery("movieData", OneMovieRequest)

//     const OneMovieRequest = async () => {
//         const url = `http://www.omdbapi.com/?i=${movieID}&apikey=b8d3ecea`;
    
//         const response = await fetch(url);
//         const responseJson = await response.json();
    
//         if (responseJson) {
//           setMovies(responseJson);
//         }
//       };
    
      
//       useEffect(
//         () => {
//           OneMovieRequest(movieID);
//         },
//         { movieID }
//       );

//     const addMovieToList = (movieList) => {
//         if (!movieList.imdbID){
//             return
//         }

//         const newMovie
//     }

// }