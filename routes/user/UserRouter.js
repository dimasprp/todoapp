const express = require('express');
const router = express.Router();
const UserController = require('./UserController');
const { validate } = require('express-validation');

const { JwtFilter } = require('../../middleware/RequestFilter');
const { createUser} = require('../../schema/UserSchema');
// base route /users

router.post('/register', validate(createUser, {}, { abortEarly: false }),UserController.create);
router.get('/',JwtFilter,  UserController.getAllUser);
router.get('/:id', JwtFilter, UserController.getOne);
router.put('/:id',  JwtFilter, UserController.update);
module.exports = router