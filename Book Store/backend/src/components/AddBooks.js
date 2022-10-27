import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  FormLabel,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const history = useNavigate();
  const [input, setInput] = useState({
    name: "",
    author: "",
    description: "",
    price: 0,
    image: "",
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  const sendReq = async () => {
    await axios
      .post("http://localhost:5000/books", {
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
    sendReq().then(()=>history("/books"));
  };

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
};

export default AddBooks;
