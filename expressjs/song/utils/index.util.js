exports.getToken = (rawToken) => {
  let token = rawToken.split(' ')[1];

  return token;
};

exports.generatePlaylist = async (shuffledSongs) => {
  let currentDuration = 0; // in seconds
  const oneHour = 3600; // in seconds
  let currentGroupSongs = [];

  for (let i = 0; i < shuffledSongs.length; i++) {
    if (currentDuration + shuffledSongs[i].duration >= oneHour) {
      break;
    }

    currentDuration += shuffledSongs[i].duration;
    currentGroupSongs.push(shuffledSongs[i]);
  }

  console.log('current duration => ', currentDuration);
  console.log('grouped by duration less then 1 hour => ', currentGroupSongs);
  return currentGroupSongs;
};

exports.shuffleFunction = async (songArrays) => {
  await songArrays.forEach((_, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [songArrays[index], songArrays[randomIndex]] = [songArrays[randomIndex], songArrays[index]];
  });

  return songArrays;
};

exports.baseResponse = (res, { success = true, data = null, response = { code: 200, message: null, error: null } }) => {
  res.status(response.code).json({
    data: data,
    success: success,
    response: {
      code: response.code,
      message: response.message,
      error: response.error,
    },
  });
};
