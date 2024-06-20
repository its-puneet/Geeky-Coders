const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./model/user');

const JWT_SECRET = 'dsaklfdakdsjh@#$%gfjbuhecbnlsajihdks';

mongoose.connect('mongodb://localhost:27017/login-app-db', err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});

const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/api/change-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        
        const _id = user.id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.updateOne({_id}, {
            $set: { password: hashedPassword }
        })

        res.json({status: 'ok'});

    } catch(err) {
        res.json({status: 'error', error: 'someone is messing around with you'});
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', async (req, res) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username }).lean();

    if(!user)
        return res.json({ status: 'error', error: 'Invalid username/password' });

    if(await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, JWT_SECRET);

        return res.json({ status: 'ok', data: token });
    }

    return res.json({ status: 'error', error: 'Invalid username/password' });
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/api/register', async (req, res) => {
    
    console.log(req.body);
    
    const { username, password: plaintextPassword } = req.body;

    if(!username || typeof username !== 'string')
        return res.json({ status: 'error', error: 'Invalid username' });

    if(!plaintextPassword || typeof plaintextPassword !== 'string')
        return res.json({ status: 'error', error: 'Invalid password' });
    
    if(plaintextPassword.length < 5)
        return res.json({ status: 'error', error: 'Password too small' })

    const hashedPassword = await bcrypt.hash(plaintextPassword, 10);
    console.log(hashedPassword);

    try {
        
        const response = await User.create({
            username,
            password: hashedPassword
        });

        console.log(response);

    } catch(err) {
        console.error('Error::: ' + JSON.stringify(err))

        if(err.code === 11000)
            return res.json({ status: 'error', error: 'Username already in use' });
        throw err;
    }

    res.json({ status: 'ok' });
});

app.listen(3000, () => {
    console.log(`Server up at http://localhost:3000`);
});