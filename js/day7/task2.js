const songs = require('./task1');

const groupSongByArtist = () => {
  let result = {};
  songs.map((song) => {
    const filteredSongs = songs.filter((val) => val.artist === song.artist);
    const { artist } = filteredSongs[0];
    Object.defineProperty(result, artist, { value: [...filteredSongs], writable: true, enumerable: true });
  });

  console.log('grouped by artist name => ', result);
};

groupSongByArtist();
