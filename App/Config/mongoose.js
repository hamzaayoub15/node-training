const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONFIG, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
console.log("Database successfully connected");
