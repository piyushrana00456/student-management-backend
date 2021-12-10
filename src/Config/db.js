const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://management:8083411512@cluster0.xmc6z.mongodb.net/sMDatabase?retryWrites=true&w=majority`
  );
};
