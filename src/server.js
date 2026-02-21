const express = require("express");
require("dotenv").config();
const sequelize = require("./config/db");
const models = require("./associations");
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/paper", require("./routes/paper.route"));
app.use("/api/submission", require("./routes/submission.route"));


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({ alter: true }); 
    console.log("Models synced");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
})();

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});