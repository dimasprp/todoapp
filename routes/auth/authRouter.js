const express = require('express');
const router = express.Router();
const AuthController = require('./authController');
const { login } = require('../../schema/AuthSchema');
// base route /users
const { validate } = require('express-validation');

// base route /auth
router.post('/login', validate(login, {}, { abortEarly: false }), AuthController.login);

module.exports = router