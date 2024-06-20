const express = require("express");
const router = express.Router();
const bookModel = require('../src/book_model');
const path = require('path');

// Handle a GET request to the root directory,
// and send "Hello World" as a response
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
});

// GET all the books
router.get('/books', async function (req, res) {
   const bookList = await bookModel.find();
   res.send(bookList);
});

// GET the specified book
router.get('/books/:id', async function (req, res) {
    const { id } = req.params;
    const book = await bookModel.findOne({id : id});
    if(!book) return res.send("Book Not Found");
    res.send(book);
});

// ADD a book
router.post('/books', async function (req, res) {
  const id = req.params.id;
  const title = req.params.title;
  const author = req.params.author;
  const pages = req.params.pages;
  const year = req.params.year;
  
  const bookExist = await bookModel.findOne({id : id});

  if (bookExist) return res.send('Book already exist');
  let data = await bookModel.create({id,title,author,pages,year});
  data.save();
  res.send("Book Uploaded");  
});

// UPDATE specified book
router.put('/books/:id', async function (req, res) {
    const { id } = req.params;
    const {
        title,
        authors,
        pages,
        year
    } = req.body;
    const bookExist = await bookModel.findOne({id : id});
    if (!bookExist) return res.send('Book Do Not exist');
    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
      ...bookExist,
      title: updateField(title, bookExist.title),
      authors: updateField(authors, bookExist.authors),
      pages: updateField(pages, bookExist.pages),
      year: updateField(year, bookExist.year),
    };
    await bookModel.updateOne(
      { id: id },
      {
        $set: {
          title: updatedBook.title,
          author: updatedBook.authors,
          pages: updatedBook.pages,
          year: updatedBook.year
        },
      }
    );
    
    res.status(200).send("Book Updated");
});

// DELETE the specified book
router.delete('/books/:id', async function (req, res) {
    const { id } = req.params;
    const bookExist = await bookModel.findOne({id : id});
    if (!bookExist) return res.send('Book Do Not exist');
   await bookModel.deleteOne({ isbn: id }).then(function(){
      res.send("Book Record Deleted Successfully")
    }).catch(function(error){
      console.log(error); // Failure
    });
});


module.exports = router;