// lib
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// model
const userModel = require("../../mongodb/models/user.model");

const authRouter = express.Router();

const tokenSecret = "asdasdsadasdsadasd";

authRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // hashing user password
    const hashedPassword = bcryptjs.hashSync(password);

    // what is hash
    // Hash is an encryption mechanism in which data is converted to gibberish (and-band-sand) format
    // which is hard to read.
    // hash is performed by a hash function
    // Data -----> HASH FUNCTION --------> HASHED DATA (one way mechanism)
    // hashed data can be compared with similar or expected string or form of data

    // generating token
    const token = jwt.sign(
      {
        firstName,
        lastName,
        email,
      },
      tokenSecret,
      {
        expiresIn: "6d",
      }
    );

    // create user in db
    const data = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.json({
      status: 200,
      success: true,
      token,
      user: data,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking for existing user in db
    const existingUser = await userModel.findOne({
      email,
    });

    const { firstName, lastName, password: hashedPassword } = existingUser;

    if (!existingUser) {
      // if user exists in db, then throw error
      return res.json({
        status: 500,
        success: false,
        message: "User does not exist",
      });
    }

    // validate password
    if (!bcryptjs.compareSync(password, hashedPassword)) {
      // password doesnt match
      return res.json({
        status: 500,
        success: false,
        message: "Invalid password",
      });
    }

    // generating token
    const token = jwt.sign(
      {
        firstName,
        lastName,
        email,
      },
      tokenSecret,
      {
        expiresIn: "6d",
      }
    );

    return res.json({
      status: 200,
      success: true,
      token,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
});

module.exports = authRouter;
