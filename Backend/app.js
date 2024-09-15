const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userrouter = require("./routes/userroute");
const taskrouter = require("./routes/taskrouter");
const categoryrouter = require("./routes/categoryrouter");
const priorityrouter = require("./routes/priorityrouter");
const inviterouter = require("./routes/inviterouter");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Todo_task");

const database = mongoose.connection;
database.on("error", (error) => {
  console.log("Error", error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
app.use("/api/user", userrouter);
app.use("/api/task", taskrouter);
app.use("/api/category", categoryrouter);
app.use("/api/priority", priorityrouter);
app.use("/api/invite", inviterouter);

app.use("/uploads", express.static("uploads"));

app.listen(5001, () => {
  console.log("http://localhost:5001");
});
