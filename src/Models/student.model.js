const mongoose = require("mongoose");

const studentScheam = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: String, required: true },
    education: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("student", studentScheam);
