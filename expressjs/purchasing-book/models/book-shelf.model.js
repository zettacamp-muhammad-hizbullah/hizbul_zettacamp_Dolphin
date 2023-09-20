module.exports = (mongoose) => {
  const bookShelfSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      embedded_books: [{ type: mongoose.model('Book').schema }],
      books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
    },
    {
      timestamps: true,
    }
  );

  const BookShelf = mongoose.model('BookShelf', bookShelfSchema);
  return BookShelf;
};
