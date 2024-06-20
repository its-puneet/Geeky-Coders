// For storing and getting the data in MongoDB and updating data
const mongoose = require('mongoose');

// User for reading and writing data in the MongoDB database
const uri = "mongodb+srv://mongo:mongo@cluster0.4wds12x.mongodb.net/books?retryWrites=true&w=majority";
const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

module.exports = connection;