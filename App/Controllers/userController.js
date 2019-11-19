const userStore = require("../Store/userStore");
const bcrypt = require("bcryptjs");
const userModel = require("../Models/userModel");
const userController = {};
//signup user
userController.createUser = async (req, res) => {
  const { body } = req;
  try {
    const result = await userStore.createUser(body);
    const token = result.generateAuthToken();
    res.status(200).send({ result, token });
  } catch (e) {
    console.log(e);
  }
};
//login user
userController.loginUser = async (req, res) => {
  try {
    const user = await userStore.findByCredentials({ email: req.body.email });
    const token = user.generateAuthToken();
    if (!user) {
      res.send("Enter valid email");
    } else {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (!result) {
        res.send("Password does not match");
      }
      res.status(200).send({ user, token });
    }
  } catch (e) {
    console.log(e);
  }
};
userController.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};
module.exports = userController;
