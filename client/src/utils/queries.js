import { gql } from '@apollo/client';

export const GET_ME = gql`
      query me {
            me {
                  _id
                  username
                  email
                  lists {
                        _id
                        movies {
                              imdbID
                              title 
                              runtime
                              releaseDate
                              actors
                              director
                              poster
                              plot
                              imdbRating
                              genre
                              rated
                              watched
                        }
                  }
            }
      }
`;

export const GET_LIST = gql`
      query list($id: ID!) {
            list(_id: $id) {
                  _id 
                  movies {
                        imdbID
                        title 
                        runtime
                        releaseDate
                        actors
                        director
                        poster
                        plot
                        imdbRating
                        genre
                        rated
                        watched
                  }
            }
      }
`;

