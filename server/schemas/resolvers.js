const { AuthenticationError } = require("apollo-server-express");
const { User, List } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, _, context) => {
      if (context.user) {
        const user = User.findOne({ _id: context.user._id }).populate({path: "lists"}).populate({path: "movies"});
        return user;
      }
      throw new AuthenticationError("You must be logged in!");
    },
    list: async (parent, { _id }, context) => {
      if (context.user) {
        const list = List.findOne({ _id }).populate({path: "movies"});
        return list;
      }
      throw new AuthenticationError("You must be logged in!");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log(username);
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    deleteUser: async (parent, _, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You must be logged in");
    },
    addList: async (parent, { name }, context) => {
      if (context.user) {
        const list = await List.create({ name });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              lists: list.id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteList: async (parent, { id }, context) => {
      if (context.user) {
        const list = await List.findOne({ _id: id });
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              lists: list._id,
            },
          },
          { new: true }
        );
        await List.findOneAndDelete({ _id: id });
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addMovie: async (parent, { movieInput }, context) => {
      if (context.user) {
        const newList = await List.create({});
        console.log(newList);
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { lists: newList._id } }
        );
        const listID = newList._id;
        const updatedList = await List.findOneAndUpdate(
          { _id: listID },
          {
            $addToSet: {
              movies: movieInput,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedList;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteMovie: async (parent, { listID, imdbID }, context) => {
      if (context.user) {
        const updatedList = await List.findOneAndUpdate(
          { _id: listID },
          {
            $pull: {
              movies: { imdbID },
            },
          },
          { new: true }
        );
        return updatedList;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
