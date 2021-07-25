const express = require('express');
const router = express.Router();
const TodoController = require('./TodoController');
const { JwtFilter } = require('../../middleware/RequestFilter');
const {create,update} = require('../../schema/TodoSchema');
// base route /todo
const { validate } = require('express-validation');

// all to be protected by jwt token and get auth data

router.post('/', JwtFilter,validate(create, {}, { abortEarly: false }), TodoController.create);
router.get('/', JwtFilter, TodoController.getAll);
router.get('/:toDoId', JwtFilter, TodoController.getOne);
router.put('/:toDoId', validate(update, {}, { abortEarly: false }), TodoController.update);
router.delete('/:toDoId', TodoController.delete);

module.exports = router