const express = require("express");
const router = express.Router();
const Contest = require("../Models/contest.model");

router.post("/", async (req, res) => {
  try {
    let contest = await Contest.create(req.body);
    return res.status(201).json({ data: contest });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let contest = await Contest.find({}).lean().exec();
    return res.status(201).json({ data: contest });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
