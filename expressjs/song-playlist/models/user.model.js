module.exports = (mongoose) => {
  const userSchema = mongoose.Schema(
    {
      username: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      password: { type: String, required: true },
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

  const User = mongoose.model('User', userSchema);
  return User;
};
