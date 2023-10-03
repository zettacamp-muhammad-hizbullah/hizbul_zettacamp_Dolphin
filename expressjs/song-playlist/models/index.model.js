const { DB } = require('../database/db');
const model = {};

model.user = require('./user.model')(DB.mongoose);
model.song = require('./song.model')(DB.mongoose);
model.playlist = require('./playlist.model')(DB.mongoose);

module.exports = model;
