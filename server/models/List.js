const { Schema, model } = require('mongoose');

const listSchema = new Schema(
      {
            name: {
                  type: String,
                  required: true
            },
            movies: [movieSchema]
      }
);

const List = model('List', listSchema);

module.exports = List;