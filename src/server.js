const express = require("express");
const app = express();
const connect = require("./Config/db");
const cors = require("cors");
app.use(express.json());

const studentController = require("./Controllers/student.controller");
const { register, login, get } = require("./Controllers/adminAuth.controller");
const contestController = require("./Controllers/contest.controller");
app.use(cors());

app.use("/student", studentController);
app.use("/contest", contestController);
app.use("/admin-signup", register);
app.use("/admin-signup", get);
app.use("/admin-login", login);
module.exports = async () => {
  try {
    await connect();
    app.listen(4000, () => {
      console.log("Listening to port 4000");
    });
  } catch (error) {
    console.log(error);
  }
};
