module.exports = (mongoose) => {
  const bookShelfSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book'
        }
      ],      
    },
    {
      timestamps: true,
    }
  );

  const BookShelf = mongoose.model('BookShelf', bookShelfSchema);
  return BookShelf;
};
