const { AuthenticationError } = require("apollo-server-express");
const { User, List } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, _, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate("Lists");
            }
            throw new AuthenticationError("You must be logged in!");
        },
        list: async (parent, { _id }, context) => {
            if (context.user) {
                return List.findOne({ _id }).populate("movies");
            }
            throw new AuthenticationError("You must be logged in!")
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            return "This is a string"
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
            throw new AuthenticationError("You must be logged in")
        },
        addList: async (parent, { name }, context) => {
            if (context.user) {
                const list = await List.create({ name })

                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            lists: list.id,
                        },
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        deleteList: async (parent, { id }, context) => {
            if (context.user) {
                const list = await List.findOneAndDelete({ _id: id });
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            lists: list._id
                        },
                    },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        addMovie: async (parent, { listID, imdbID }, context) => {
            if (context.user) {
                const updatedList = await List.findOneAndUpdate(
                    { _id: listID },
                    {
                        $addToSet: {
                            movies: { imdbID }
                        },
                    },
                    {
                        new: true,
                        runValidators: true
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
                            movies: { imdbID }
                        },
                    },
                    { new: true }
                );
                return updatedList;
            }
            throw new AuthenticationError("You need to be logged in!");
        }
    }
};

module.export = resolvers;