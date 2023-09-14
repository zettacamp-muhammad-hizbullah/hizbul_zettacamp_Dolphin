const songs = require('../data/song');
const { shuffleFunction, generatePlaylist } = require('../utils/index.util');

exports.groupSongByArtist = async () => {
  let result = {};
  songs.map((song) => {
    const filteredSongs = songs.filter((val) => val.artist === song.artist);
    const { artist } = filteredSongs[0];
    Object.defineProperty(result, artist, { value: [...filteredSongs], writable: true, enumerable: true });
  });

  console.log('grouped by artist name => ', result);
  return result;
};

exports.groupSongByGenre = async () => {
  let result = {};
  songs.map((song) => {
    const filteredSongs = songs.filter((val) => val.genre === song.genre);
    const { genre } = filteredSongs[0];
    Object.defineProperty(result, genre, { value: [...filteredSongs], writable: true, enumerable: true });
  });

  console.log('grouped by genre => ', result);
  return result;
};

exports.groupSongByDuration = async () => {
  let shuffledSongs = await shuffleFunction(songs);
  const result = await generatePlaylist(shuffledSongs);

  return result;
};
