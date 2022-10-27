import express, { Router } from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';

import  {bookRoute}  from './routes/book_routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const CONNECTION_URL =
    "mongodb+srv://admin:hsccDbZkD0SjQxVy@cluster0.h3tyomd.mongodb.net/?retryWrites=true&w=majority";
    
app.get('/', (req, res) => {
    res.send("Hey there")
});

app.use("/books", bookRoute);

mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Sucessfully connected to database"))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
