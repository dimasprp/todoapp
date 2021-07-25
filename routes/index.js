const { Router } = require('express');

const routes = Router();

routes.use('/auth', require('./auth/authRouter'));
routes.use('/user', require('./user/UserRouter'));
routes.use('/todo', require('./todo/TodoRouter'));

module.exports = routes;