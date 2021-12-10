const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

const Admin = require("../Models/admin.model");

const newToken = (admin) => {
  return jwt.sign({ admin: admin }, process.env.JWT_SECRET_KEY);
};

//Registration

const register = router.post(
  "/",
  body("email")
    .isEmail()
    .custom((value) => {
      if (value.includes("@masai.school")) {
        return true;
      }
      return false;
    })
    .withMessage("email is required and must be a valid email address"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }
    try {
      let admin = await Admin.findOne({
        email: req.body.email,
      }).exec();
      //if user already exist
      if (admin)
        return res.status(400).json({
          status: "error",
          message: "User already exist",
        });

      //otherwise create a user and then hash the password with prev in schema

      admin = await Admin.create(req.body);
      const token = newToken(admin);
      return res.status(201).json({ admin, token });
    } catch (error) {
      return res.status(400).json({ error: error.message + " " + "here i'm" });
    }
  }
);

const get = router.get("/", async (req, res) => {
  try {
    let admin = await Admin.find({}).lean().exec();
    return res.status(200).json({ admin: admin });
  } catch (error) {
    return res.status(400).json({ error });
  }
});
//login

const login = router.get("/", async (req, res) => {
  try {
    let admin = await Admin.find({
      email: req.body.email,
    }).exec();
    console.log(admin);
    if (!admin) {
      return res
        .status(400)
        .json({ status: "error", message: "User does not exist" });
    }
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).json({
        status: "Failed",
        message: "Email or Password is Incorrect",
      });
    }
    const token = newToken(admin);

    return res.status(201).json({ admin, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = { register, login, get };
