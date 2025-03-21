const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
