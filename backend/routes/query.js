const express = require("express");
const queryRouter = express.Router();
const { inputquery } = require("../controllers/query");


queryRouter.post("/mongodb-query", inputquery);


module.exports = queryRouter;