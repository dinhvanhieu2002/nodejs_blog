const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/stored/courses', userController.storedCourses);
router.post('/create', userController.validate, userController.create);
router.get('/register', userController.register);
router.post('/login', userController.authenticate);
router.get('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
