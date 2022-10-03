const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const pool = require('./database/mysqlConnector');
const userRouter = require('./server/routes/user');

const app = express();

// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse application/json
app.use(bodyParser.json());

// Set-up static files
app.use(express.static('public'));

// Set-up template engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');

// Connect to database
pool.getConnection((err, connection) => {
    if(err)     throw err;  // not connected
    console.log(`Connected as ID ${connection.threadId}`);
});

app.use('/', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });