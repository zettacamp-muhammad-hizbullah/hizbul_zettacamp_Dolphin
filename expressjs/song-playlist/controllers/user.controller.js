const { ApolloError } = require('apollo-server-express');
const userService = require('../services/user.service');
const { graphQlAuthMiddleware } = require('../middlewares/auth.middleware');

exports.getUsers = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    let perPage = args?.perPage || 10;
    let page = args?.page || 1;

    if (perPage < 1) {
      perPage = 1;
    }
    if (page < 1) {
      page = 1;
    }

    const result = await userService.retriveSongs(Number(perPage), Number(page));
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL_SERVER_ERROR');
  }
};

exports.getAllUser = async (parent, args, ctx, info) => {
  graphQlAuthMiddleware(parent, args, ctx, info);
  try {
    const result = await userService.getAllUser();
    // const result = await ctx.loaders.songLoader.loadMany()
    return result;
  } catch (error) {
    throw new ApolloError('INTERNAL_SERVER_ERROR');
  }
};
