import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  image:{
  type: String,
    required: true
  }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;