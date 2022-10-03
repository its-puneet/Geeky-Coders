const mysql2 = require('mysql2');
const pool = require('./../../database/mysqlConnector')

// View Users
exports.view = (req, res) => { 
    
    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Use the connection
        connection.query("SELECT * FROM user WHERE status = 'active'", (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err) {
                let removedUser = req.query.removedUser;
                res.render('home.hbs', { rows, removedUser });
            }
            else
                console.log(err);

            console.log('The data from user table: \n', rows);
        });
    });

};

// Find User
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        let searchTerm = req.body.search;

        // Use the connection
        connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err)
                res.render('home.hbs', { rows });
            else
                console.log(err);

            // console.log('The data from user table: \n', rows);
        });
    });
    
};

// Show Form
exports.form = (req, res) => {

    res.render('add-user.hbs');
    
};

// Add User
exports.add = (req, res) => {

    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        let { first_name, last_name, email, phone, comments} = req.body;

        // Use the connection
        connection.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?", [first_name, last_name, email, phone, comments], (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err)
                res.render('add-user.hbs', {alert: 'User added successfully.'});
            else
                console.log(err);

        });
    });
};

// Edit user data
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        let userID = req.params.id;
        
        // Use the connection
        connection.query("SELECT * FROM user WHERE id = ?", [userID], (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err)
                res.render('edit-user.hbs', { rows });
            else
                console.log(err);

        });
    });
};

// Update user data
exports.update = (req, res) => {
    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        let userID = req.params.id;
        let { first_name, last_name, email, phone, comments} = req.body;

        // Use the connection
        connection.query("UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?", [first_name, last_name, email, phone, comments, userID], (err, rows) => {
            // when done with the connection, release it
            connection.release();
            if(err) console.log(err);
        });

        connection.query("SELECT * FROM user WHERE id = ?", [userID], (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err)
                res.render('edit-user.hbs', { rows, alert: 'User edited successfully.' });
            else
                console.log(err);

        });
    });
};

// Delete User
exports.delete = (req, res) => {
    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Use the connection
        // connection.query("DELETE FROM user WHERE id = ?", [req.params.id], (err, rows) => {
        //     // when done with the connection, release it
        //     connection.release();

        //     if(!err)
        //         res.redirect('/');
        //     else
        //         console.log(err);

        //     console.log('The data from user table: \n', rows);
        // });

        connection.query("UPDATE user SET status = 'removed' WHERE id = ?", [req.params.id], (err, rows) => {
            // when done with the connection, release it
            connection.release();

            if(!err) {
                let removedUser = encodeURIComponent('User successfully removed.');
                res.redirect(`/?removedUser=${removedUser}`);
            }
            else
                console.log(err);

            console.log('The data from user table: \n', rows);
        });
    });
}

// View User
exports.viewData = (req, res) => {
    pool.getConnection((err, connection) => {

        if(err)     throw err;  // not connected
        console.log(`Connected as ID ${connection.threadId}`);

        // Use the connection
        connection.query("SELECT * FROM user WHERE id = ?",[req.params.id], (err, row) => {
            // when done with the connection, release it
            connection.release();

            if(!err)
                res.render('view-user.hbs', { row });
            else
                console.log(err);

        });
    });
}