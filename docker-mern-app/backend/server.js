const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const port = 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("the backend is running in sync test 2 passed")
})

const userRoutes = require('./routers/UserRoutes.js');
app.use('/user', userRoutes);

const userLogin = require('./routers/UserLogin.js');
app.use('/login', userLogin);

const Post = require('./routers/PostRoutes.js');
app.use('/post', Post);


app.listen(port, () => {
    console.log("working")
})

mongoose.connect("mongodb+srv://test:test@harshit.q5po4.mongodb.net/?retryWrites=true&w=majority");


