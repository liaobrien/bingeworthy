const { gql } = require('apollo-server-express');

const typeDefs = gql`
      type User {
            _id: ID!
            username: String!
            email: String!
            lists: [List]
      }

      type List {
            _id: ID!
            movies: [Movie]
      }

      type Movie {
            imdbID: String!
            title: String!
            runtime: String!
            releaseDate: String!
            actors: String!
            director: String!
            poster: String
            plot: String!
            imdbRating: String!
            genre: String!
            rated: String!
            watched: Boolean!
      }

      type Auth {
            token: ID!
            user: User
      }

      type Query {
            me: User
            list: List
      }

      type Mutation {
            addUser(username: String!, email: String!, password: String!): Auth
            login(email: String!, password: String!): Auth
            deleteUser(_id: ID!): User
            addList(name: String!): User
            deleteList(_id: ID!): User
            addMovie(imdbID: String!): List
            deleteMovie(imdbID: String!): List
      }
`;

module.exports = typeDefs;