const express = require("express");
const router = express.Router();
const Student = require("../Models/student.model");

router.post("/", async (req, res) => {
  try {
    let user = await Student.create(req.body);
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let user = await Student.find({}).lean().exec();
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let user = await Student.findByIdAndDelete(req.params.id);
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
