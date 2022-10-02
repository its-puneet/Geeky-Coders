const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

router.post('/', async (req, res) => {
    const NewPost = new Post({
        title: req.body.title,
        text: req.body.text,
    })
    try {
        const postcreated = await NewPost.save();
        res.status(201).json(postcreated);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;