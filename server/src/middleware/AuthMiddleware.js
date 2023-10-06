const express = require("express");
const jwt = require("jsonwebtoken");

const tokenSecret = "asdasdsadasdsadasd";

const AuthMiddleware = async (req, res, next) => {
  const authHeaders = req.headers["authorization"];

  if (!authHeaders) {
    return res.json({
      message: "Token not passed!",
    });
  }

  // headers
  // authorization: Bearer <Token>
  // split(headers) => ["Bearer", "Token"]

  const token = authHeaders.split(" ")[1];

  const data = jwt.verify(token, tokenSecret);

  if (!data) {
    return res.json({
      message: "Invalid Token",
    });
  }

  req.user = data;
  next();
};

module.exports = AuthMiddleware;
