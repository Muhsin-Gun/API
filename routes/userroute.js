const express = require("express");
const routes = express.Router();
const userController = require("../Controller/usercontroller");

routes.post('/register', userController.register);

module.exports = routes;
