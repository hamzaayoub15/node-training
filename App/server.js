const app = require("./app");
require("dotenv").config({ path: "../Config/dev.env" });
require("./Config/mongoose");

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started on port " + port);
});
