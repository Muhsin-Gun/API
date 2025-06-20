const express = require("express");
const routes = express.Router();
const userController = require("../Controller/usercontroller");

routes.post('/register', userController.register);

routes.post('/login', userController.login);
module.exports = routes;
