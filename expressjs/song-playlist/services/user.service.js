const Model = require('../models/index.model');

exports.getUserByUsername = async (username) => {
  let result = null;
  try {
    result = await Model.user.find({ username: username });
  } catch (error) {
    throw new Error(error);
  }

  return result;
};

exports.getAllUser = async () => {
  let result = null;
  try {
    result = await Model.user.find();
  } catch (error) {
    throw new Error(error);
  }

  return result;
};
