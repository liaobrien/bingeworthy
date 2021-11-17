import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
      mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                  token
                  user {
                        _id
                        username
                  }
            }
      }
`;

export const ADD_USER = gql`
      mutation addUser($username: String!, $email: String!, $password: String!) {
            addUser(username: $username, email: $email, password: $password) {
                  token
                  user {
                        _id
                        username
                  }
            }
      }
`;

export const DELETE_USER = gql`
      mutation deleteUser($id: ID!) {
            deleteUser(id: $id) {
                  token
                  user {
                        _id
                        username
                  }
            }
      }
`;

export const ADD_LIST = gql`
      mutation addList($name: String!) {
            addList(name: $name) {
                  _id
                  username
                  email
                  listCount
                  lists {
                        _id
                        name
                  }
            }
      }
`;

export const DELETE_LIST = gql`
      mutation deleteList($id: ID!) {
            deleteList(id: $id) {
                  _id
                  username
                  email
                  listCount
                  lists {
                        _id
                        name
                  }
            }
      }
`;

export const ADD_MOVIE = gql`
      mutation addMovie($listID: ID!, $imdbID: String!) {
            addMovie(listID: $listID, imdbID: $imdbID) {
                  _id
                  name
                  movies {
                        imdbID
                        title
                        releaseDate
                        poster
                        plot
                        watched
                  }
            }
      }
`;

export const DELETE_MOVIE = gql`
      mutation deleteMovie($listID: ID!, $imdbID: String!) {
            deleteMovie(listID: $listID, imdbID: $imdbID) {
                  _id
                  name
                  movies {
                        imdbID
                        title
                        releaseDate
                        poster
                        plot
                        watched
                  }
            }
      }
`;

export const WATCH_MOVIE = gql`
      mutation watchMovie($watched: Boolean!) {
            watchMovie(watched: $watched) {
                  _id
                  imdbID
                  title
                  releaseDate
                  poster
                  plot
                  watched
            }
      }
`;