const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: Buffer
  }
});
//virtual schema to store task created by users
userSchema.virtual("tasks", {
  ref: "todo",
  localField: "_id",
  foreignField: "owner"
});
//password hashing
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
//generating authentication token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

const user = mongoose.model("user", userSchema);
module.exports = user;
