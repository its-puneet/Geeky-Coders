import express from "express";
import { getAllBooks, addBooks, getBookbyId, updateBookById, deleteBookById } from "../controllers/book-controller.js";
import Book from "../model/Book.js";
const router = new express.Router();


export const bookRoute = router.get("/", getAllBooks);

export const getId = router.get("/:id", getBookbyId);

export const addBook = router.post("/", addBooks);

export const updateBook = router.put("/:id", updateBookById);

export const deleteBook = router.delete("/:id", deleteBookById);


