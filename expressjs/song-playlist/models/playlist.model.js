module.exports = (mongoose) => {
  const playlistSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      songs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Song',
        },
      ],      
    },
    {
      timestamps: true,
    }
  );

  const Playlist = mongoose.model('Playlist', playlistSchema);
  return Playlist;
};
