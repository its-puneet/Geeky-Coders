const express = require('express');
const router = express.Router();
const User = require('../models/user.model');



router.post('/', async (req, res) => {
    const NewUser = new User({
        Name: req.body.Name,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const usercreated = await NewUser.save();
        res.status(201).json(usercreated);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})



module.exports = router;