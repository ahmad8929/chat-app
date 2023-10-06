// lib
const express = require("express");
const AuthMiddleware = require("../../middleware/AuthMiddleware");

const testRouter = express.Router();

testRouter.get("/", AuthMiddleware, async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      status: 200,
      success: true,
      message: `Hi ${user.firstName}`,
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
});

module.exports = testRouter;
