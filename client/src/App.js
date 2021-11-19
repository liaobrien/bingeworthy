import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList/MovieList";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox/SearchBox";
import AddToWatchList from "./components/AddToWatchList";
import Navigation from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import ViewOne from "./components/SingleMovie/View";
import SingleMovie from "./components/SingleMovie/";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginPage from "./components/pages/login";
import SignupPage from "./components/pages/signup";

const httpLink = createHttpLink({
	uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ``,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [AddToWatch, setAddToWatch] = useState([]);
  const [ViewMovie, setViewMovie] = useState([]);

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&${process.env.REACT_APP_API_KEY}`;

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
	  <ApolloProvider client={client}>
		<div className="container-fluid movie-app align-items-center mt-4 mb-4">
			<div className="row d-flex align-items-center mt-4 mb-4"></div>
			<div className="row">
				<MovieHeading heading="BingeWorthy" />
					<div className="positioning">
					<Router>
						
					<Navigation />
          <div class="d-flex flex-wrap">
						<Route  exact path="/">
							<MovieList
							movies={movies}
							watchListComponent={AddToWatchList}
							handleAddedMovieClick={newAddToWatch}
							viewOneMovie={ViewOne}
							handleViewMovieClick={newViewMovie}
							/>
							<SearchBox
								searchValue={searchValue}
								setSearchValue={setSearchValue}
							/>
						</Route>
            </div>
						<Route exact path="/movie/:movieID">
							<SingleMovie />
						</Route>
						<Route exact path="/login">
							<LoginPage />
						</Route>
						<Route exact path="/signup">
							<SignupPage />
						</Route>
						{/* <Route path='Donate' <Donate />/> */}
					</Router>
				</div>
			</div>
		</div>
	</ApolloProvider>
  );
};

export default App;
