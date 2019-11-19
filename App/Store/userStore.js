const userModel = require("../Models/userModel");
class User {
  //signup user
  static createUser(userObj) {
    return userModel.create(userObj);
  }
  //login user
  static findByCredentials(email) {
    return userModel.findOne(email);
  }
}
module.exports = User;
