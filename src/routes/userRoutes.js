const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tipousuarioController = require('../controllers/tipousuarioController');
const path = require('path');
const authController = require('../controllers/authController');

router.post('/usuario', userController.createUser);

router.post('/tipousuario', tipousuarioController.createTypeUser);

router.get('/usuario', userController.getUsers);

router.get('/usuario/:id', userController.getUserById);

router.put('/usuario/:id', userController.updateUser);

router.delete('/usuario/:id', userController.deleteUser);

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});
router.post('/login', authController.login);

module.exports = router;
