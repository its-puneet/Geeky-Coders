import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Book.css";

const Book = (props) => {
  const history = useNavigate();
  const { _id, name, author, description, price, image } = props.book;
  
  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/books/${_id}`);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteHandler().then(() => console.log("Successfully Deleted Book")).then(()=>history("/")).then(()=>history("/books"));
  }

  return (
    <>
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>Rs {price}</h4>
      <Button
        sx={{ mt: "auto" }}
        LinkComponent={Link}
        to={`/updateDetails/${_id}`}
      >
        Update
      </Button>
      <Button sx={{ mt: "auto" }} onClick={handleDelete}>Delete</Button>
    </>
  );
};

export default Book;
