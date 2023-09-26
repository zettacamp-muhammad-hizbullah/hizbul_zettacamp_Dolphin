exports.shuffleFunction = async (songArrays) => {
  await songArrays.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [songArrays[index], songArrays[randomIndex]] = [songArrays[randomIndex], songArrays[index]];
  });

  return songArrays;
};

exports.generatePlaylist = async (shuffledSongs, maxSecond = 3500) => {
  let currentDuration = 0; // in seconds
  let currentGroupSongs = [];

  for (let i = 0; i < shuffledSongs.length; i++) {
    if (currentDuration + shuffledSongs[i].duration >= maxSecond) {
      break;
    }

    currentDuration += shuffledSongs[i].duration;
    currentGroupSongs.push(shuffledSongs[i]);
  }

  // console.log('current duration => ', currentDuration);
  // console.log('grouped by duration less then 1 hour => ', currentGroupSongs);
  return currentGroupSongs;
};
