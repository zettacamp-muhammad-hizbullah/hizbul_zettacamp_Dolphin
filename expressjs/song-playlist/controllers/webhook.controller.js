const { ApolloError } = require('apollo-server-express');
const fetch = require('node-fetch');
const songService = require('../services/song.service');

exports.storePlaylistWebhook = async (parent, args, ctx, info) => {
  try {
    const reqBody = args?.input;

    const resp = await fetch('https://webhook.site/e50d2268-3e0e-43ce-b9a1-353664324839', {
      method: 'POST',
      body: JSON.stringify(reqBody),
    });

    const data = await resp.json();

    if (resp.status !== 200) {
      throw new ApolloError('WEBHOOK FETCH FAILED');
    }

    return {
      status: resp.status,
      message: resp.statusText,
      data: data,
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};

exports.updateSongWebhook = async (req, res) => {
  try {
    const reqBody = req?.body;

    const resp = await fetch('https://webhook.site/2faf72f0-6f70-4882-b364-fa945df8620c', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        Authorizations: req.headers.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await resp.json();

    if (resp.status !== 200) {
      throw new Error('WEBHOOK FETCH FAILED');
    }

    const { _id: songId, ...payload } = reqBody;
    songService.updateSong(songId, payload);

    return res.json({
      status: resp.status,
      message: resp.statusText,
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'not ok',
      message: error?.message || error,
    });
  }
};
