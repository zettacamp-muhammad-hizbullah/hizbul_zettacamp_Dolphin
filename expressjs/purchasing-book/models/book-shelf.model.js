module.exports = (mongoose) => {
  const bookShelfSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      book_ids: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        },
      ],
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    }
  );

  const BookShelf = mongoose.model('BookShelf', bookShelfSchema);
  return BookShelf;
};
