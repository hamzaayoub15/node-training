const todoStore = require("../Store/todoStore");
const todoController = {};
//create a new todo
todoController.createTodo = async (req, res) => {
  const { body } = req;

  try {
    const result = await todoStore.createTodo({ ...body, owner: req.user._id });
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
};
// Find One Todo
todoController.findTodo = async (req, res) => {
  const { params } = req;
  console.log(params.id.length);
  try {
    if (params.id.length < 0) {
      res.send("Please Provide Id");
    } else {
      const todoItemData = await todoStore.findTodo({
        _id: params.id,
        owner: req.user._id
      });
      res.send(todoItemData);
    }
  } catch (e) {
    console.log(e);
  }
};
//find all todos
todoController.findAll = async (req, res) => {
  try {
    //const result = await todoStore.findAll({ owner: req.user._id });
    await req.user.populate("tasks").execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    console.log(e);
  }
};
//find by id and update
todoController.update = async (req, res) => {
  const { body } = req;
  const updates = Object.keys(body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    res.send("invalid update");
  }
  try {
    const result = await todoStore.updateTodo(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      body
    );
    res.send(result);
  } catch (e) {
    console.log(e);
  }
};
//delete todo
todoController.delete = async (req, res) => {
  const { params } = req;
  try {
    const result = await todoStore.deleteTodo({
      _id: params.id,
      owner: req.user._id
    });
    console.log(result);
    if (!result) {
      res.status(404).send("invalid task id ");
    }
    res.send("Todo Deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
module.exports = todoController;
