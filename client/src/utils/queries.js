import { gql } from '@apollo/client';

export const GET_ME = gql`
      query me {
            me {
                  _id
                  username
                  email
                  listCount
                  lists {
                        name
                  }
      }
`;

export const GET_LIST = gql`
      query list($id: ID!) {
            list(id: $id) {
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

