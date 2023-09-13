const express = require("express");
const routes = express.Router();
const userControl = require("../controllers/user-control");


//adding user 
routes.post("/add-user", userControl.addUser);

module.exports = routes;