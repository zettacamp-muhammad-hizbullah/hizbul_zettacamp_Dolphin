const songs = require('./task1');

const groupSongByDuration = () => {
  let currentDuration = 0; // in seconds
  const oneHour = 600; // in seconds
  let currentGroupSongs = [];
  let shuffledSongs = shuffleFunction(songs);

  // let shuffledSongs = songs.sort(() => 0.5 - Math.random())
  // let shuffledSongs = songs.sort((a, b) => {
  //   let sortedNumber = 1;
  //   console.log(sortedNumber);
  //   console.log('a => ', a);
  //   console.log('b => ', b);
  //   return sortedNumber;
  // });
  // console.log('shuffledSongs', songs);

  generatePlaylist(() => {
    for (let i = 0; i < shuffledSongs.length; i++) {
      if (currentDuration + shuffledSongs[i].duration >= oneHour) {
        break;
      }

      currentDuration += shuffledSongs[i].duration;
      currentGroupSongs.push(shuffledSongs[i]);
    }

    console.log('current duration => ', currentDuration);
    console.log('grouped by duration less then 1 hour => ', currentGroupSongs);
  });
};

const generatePlaylist = (callBackFunc) => {
  callBackFunc();
};

const shuffleFunction = (songArrays) => {
  songArrays.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [songArrays[index], songArrays[randomIndex]] = [songArrays[randomIndex], songArrays[index]];
  });

  return songArrays;
};

groupSongByDuration();
