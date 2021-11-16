const { Schema } = require('mongoose');

const movieSchema = new Schema(
      {
            imdbID: {
                  type: String,
                  required: true
            },
            title: {
                  type: String,
                  required: true
            },
            runtime: {
                  type: String,
                  required: true
            },
            releaseDate: {
                  type: String,
                  required: true
            },
            actors: {
                  type: String,
                  required: true
            },
            director: {
                  type: String,
                  required: true
            },
            poster: {
                  type: String
            },
            plot: {
                  type: String,
                  required: true
            },
            imdbRating: {
                  type: String,
                  required: true
            },
            genre: {
                  type: String,
                  required: true
            },
            rated: {
                  type: String,
                  required: true
            }
      }
);

module.exports = movieSchema;