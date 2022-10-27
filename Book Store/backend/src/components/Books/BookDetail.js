import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {
  TextField,
  FormLabel,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookDetail = () => {
    const history = useNavigate();
    const id = useParams().id;
    console.log(id);
    const [input, setInput] = useState({
      name: "",
      author: "",
      description: "",
      price: 0,
      image: "",
    });
    const [book, setBook] = useState({});
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: [e.target.value],
      }));
    };
    const getBookDetails = async () => {
        return await axios.get(`http://localhost:5000/books/${id}`).then((res) => res.data);
    };
    useEffect(() => {
        getBookDetails().then((data) => {
            setBook(data);
            console.log(data.book);
            const BookDetails = data.book;
            setInput({
                name: BookDetails.name,
                author: BookDetails.author,
                description: BookDetails.description,
                image: BookDetails.image,
                price: BookDetails.price,
            })
            setChecked(BookDetails.availability);
        })
    }, []);
      const sendReq = async () => {
        await axios
          .put(`http://localhost:5000/books/${id}`, {
            name: String(input.name),
            author: String(input.author),
            description: String(input.description),
            price: Number(input.price),
            image: String(input.image),
            availability: Boolean(checked),
          })
          .then((res) => res.data)
          .then(console.log("Successfully added the book"));
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendReq().then(() => history('/books'));
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={700}
          alignContent={"center"}
          justifyContent={"center"}
          alignSelf={"center"}
          marginLeft="auto"
          marginRight={"auto"}
          marginTop={"5rem"}
        >
          <FormLabel> Name </FormLabel>
          <TextField
            value={input.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="name"
          />
          <FormLabel> Author </FormLabel>
          <TextField
            value={input.author}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="author"
          />
          <FormLabel> Description </FormLabel>
          <TextField
            value={input.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="description"
          />
          <FormLabel> Price </FormLabel>
          <TextField
            value={input.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
          <FormLabel> Image URL </FormLabel>
          <TextField
            value={input.image}
            onChange={handleChange}
            margin="normal"
            fullWidth
            variant="outlined"
            name="image"
          />
          <FormControlLabel
            label="Available"
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
          />
          <Button variant="contained" type="Submit">
            Add Book
          </Button>
        </Box>
      </form>
    </>
  );
}

export default BookDetail