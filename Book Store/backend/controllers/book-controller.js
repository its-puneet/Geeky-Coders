import Book from "../model/Book.js";

export const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ books });
};

export const getBookbyId = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  } else {
    return res.status(201).json({ book });
  }
};

export const addBooks = async (req, res, next) => {
  let book;
  console.log(req.body);
  const { name, author, description, price, availability, image } = req.body;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      availability,
      image,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable to add the book" });
  }
  return res.status(201).json({ book });
};

export const updateBookById = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, availability, image } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      availability,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "NO SUCH BOOK FOUND" });
  }
  return res.status(200).json({ book });
};

export const deleteBookById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    res.status(404).json({ message: "Book not found" });
  } else {
    res.status(200).json({ message: "BOOK SUCCESSFULLY DELETED" });
  }
};
