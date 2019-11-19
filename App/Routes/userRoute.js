const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const userController = require("../Controllers/userController");
//Create User
router.post("/users", userController.createUser);
//login user
router.post("/users/login", userController.loginUser);
//logout user
router.post("/users/logout/me", auth, userController.logout);
module.exports = router;
