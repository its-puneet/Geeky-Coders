const mongoose = require('mongoose');
const db = require('../src/db');

// MongoDB Mongoose Schema
const bookSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    title:{
        type:String,
        default:"----"
    },
    author:{
        type:String,
        default:"----"
    },
    pages:{
        type:Number,
    },
    year:{
        type:Number
    }
});

const bookmodel = mongoose.model('book-data',bookSchema);

module.exports = bookmodel;