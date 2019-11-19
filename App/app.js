const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoute = require("./Routes/todoRoutes");
const userRoute = require("./Routes/userRoute");
const app = express();
//defining middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//routes
app.use(todoRoute);
app.use(userRoute);

module.exports = app;
