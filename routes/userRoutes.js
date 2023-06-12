const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')


router
    .route('/login')
    .post(authController.login)

router
    .route('/inscription')
    .post(userController.createUser)

    module.exports = router; 