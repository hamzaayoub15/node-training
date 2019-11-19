const todoModel = require("../Models/todoModel");
class todoStore {
  //create todo
  static createTodo(todoObj) {
    return todoModel.create(todoObj);
  }
  //find todo by Id
  static findTodo(todoId) {
    return todoModel.findOne(todoId);
  }
  //find all todos
  static findAll({}) {
    return todoModel.find({});
  }
  //update todo

  static updateTodo(todoId, body) {
    return todoModel.findByIdAndUpdate(todoId, body);
  }
  //delete todo
  static deleteTodo(todoId) {
    return todoModel.findOneAndDelete(todoId);
  }
}

module.exports = todoStore;
