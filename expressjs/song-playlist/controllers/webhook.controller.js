const { ApolloError } = require('apollo-server-express');
const fetch = require('node-fetch');

exports.storePlaylistWebhook = async (parent, args, ctx, info) => {
  try {
    const reqBody = args?.input;

    const resp = await fetch('https://webhook.site/e50d2268-3e0e-43ce-b9a1-353664324839', {
      method: 'POST',
      body: JSON.stringify(reqBody),            
    });

    const data = await resp.json()
    
    if (resp.status !== 200) {
      throw new ApolloError('WEBHOOK FETCH FAILED');
    }

    return {
      status: resp.status,
      message: resp.statusText,
      data: data
    };
  } catch (error) {
    throw new ApolloError(error);
  }
};
