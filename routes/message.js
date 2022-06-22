const express = require("express");
const MessageController = require("../controller/message");
const api = express.Router();
api.get("/hello-world", MessageController.helloWorld);
module.exports = api;