const songs = require('./task1');

const groupSongByGenre = () => {
  let result = {};
  songs.map((song) => {
    const filteredSongs = songs.filter((val) => val.genre === song.genre);
    const { genre } = filteredSongs[0];
    Object.defineProperty(result, genre, { value: [...filteredSongs], writable: true, enumerable: true });
  });

  console.log('grouped by genre => ', result);
};

groupSongByGenre();
