module.exports = (mongoose) => {
  const bookSchema = mongoose.Schema(
    {
      title: { type: String, required: true },
      price: {
        type: Number,
        required: true,
      },
      is_for_sell: {
        type: Boolean,
        default: true,
      },
      stock: {
        type: Number,
        default: 0,
      },
      author: {
        first_name: {
          type: String,
        },
        last_name: {
          type: String,
        },
      },
      genre: [{ type: String }],
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
