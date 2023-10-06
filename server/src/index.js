// lib
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");
const { Socket } = require("dgram");

const connectMongo = require("./mongodb/connect");

// routes
const authRoutes = require("./routes/auth/routes");
const testRoutes = require("./routes/test/routes");

const app = express();
const port = 4500 || process.env.PORT;

app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);

const server = http.createServer(app);
const io = socketIO(server);

// db
connectMongo();

const users = [{}];

io.on("connection", (socket) => {
  // on means here data receive karna
  console.log("New Connection establish");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined`);
    socket.broadcast.emit("userJoined", {
      user: "Admin",
      message: ` ${users[socket.id]} has joined`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `Welcome to the chat ${users[socket.id]}`,
    });
  });

  socket.on("message", ({ message, id }) => {
    io.emit("sendMessage", { user: users[id], message, id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("leave", {
      user: "Admin",
      message: `${users[socket.id]}  has left`,
    });
    console.log(`user left`);
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port number http://localhost:${port}`);
});
