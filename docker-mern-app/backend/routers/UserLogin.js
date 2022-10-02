const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/', (req, res) => {
    const Username = req.body.username;
    const Password = req.body.password;
    User.findOne({ username: Username }, (err, user) => {
        if (user) {
            if (Password == user.password) {
                res.send(user);
            }
        }
    })

})

module.exports = router;