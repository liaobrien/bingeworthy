const { gql } = require('apollo-server-express');

const typeDefs = gql`
      type User {
            _id: ID!
            username: String!
            email: String!
            password: String!
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
            list(_id: ID!): List
      }
input MovieData {
      imdbID: String!
      title: String!
      runtime: String!
      releaseDate: String
      actors: String
      director: String
      poster: String
      plot: String
      imdbRating: String
      genre: String
      rated: String
      watched: Boolean
}
      type Mutation {
            addUser(username: String!, email: String!, password: String!): Auth
            login(email: String!, password: String!): Auth
            deleteUser: User
            addList(name: String!): User
            deleteList(_id: ID!): User
            addMovie(movieInput:MovieData!): List
            deleteMovie(listID: ID!, imdbID: String!): List
            watchMovie(watched: Boolean!): Movie
      }
`;

module.exports = typeDefs;