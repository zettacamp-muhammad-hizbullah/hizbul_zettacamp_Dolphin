module.exports = (mongoose) => {
  const songSchema = mongoose.Schema(
    {
      title: { type: String, required: true },
      artist: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        default: 0,
        required: true,
      },
      genre: [{ type: String }],
      playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

  //   songSchema.method('toJSON', function () {
  //     const { __v, createdAt, updatedAt, ...object } = this.toObject();
  //     // object.id = _id;
  //     return object;
  //   });

  const Song = mongoose.model('Song', songSchema);
  return Song;
};
