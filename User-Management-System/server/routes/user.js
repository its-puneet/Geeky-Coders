const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

// create, find, update, delete

router.get('/', userController.view);
router.post('/', userController.find);

router.get('/addUser', userController.form);
router.post('/addUser', userController.add);

router.get('/deleteUser/:id', userController.delete);

router.get('/editUser/:id', userController.edit);
router.post('/editUser/:id', userController.update);

router.get('/viewUser/:id', userController.viewData);

module.exports = router;