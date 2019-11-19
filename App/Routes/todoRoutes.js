const express = require("express");
const router = express.Router();
const todo = require("../Controllers/todoController");
const auth = require("../Middleware/auth");
//Creating a new task
router.post("/todos", auth, todo.createTodo);
//find todo by id
router.get("/todos/:id", auth, todo.findTodo);
//find all todos
router.get("/todos", auth, todo.findAll);
//update todo
router.patch("/todos/:id", auth, todo.update);
//delete todo
router.delete("/todos/:id", auth, todo.delete);
module.exports = router;
