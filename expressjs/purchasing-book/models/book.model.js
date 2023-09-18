module.exports = (mongoose) => {
  const bookSchema = mongoose.Schema(
    {
      title: String,
      price: Number,
      stock: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

  //   bookSchema.method('toJSON', function () {
  //     const { __v, createdAt, updatedAt, ...object } = this.toObject();
  //     // object.id = _id;
  //     return object;
  //   });

  const Book = mongoose.model('Book', bookSchema);
  return Book;
};
