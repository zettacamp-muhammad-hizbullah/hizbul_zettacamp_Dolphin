const { DB } = require('../database/db');
const model = {};

model.song = require('./song.model')(DB.mongoose);
model.playlist = require('./playlist.model')(DB.mongoose);

module.exports = model;
