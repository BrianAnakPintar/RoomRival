const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let users = [];
let rooms = [];

/*
room
{
  roomid,
  pointsWorth,
  currentUser
}

*/

function addUser(id, username) {
  let user = {id: id, user: username, pts: 0};
  users.push(user);
}

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("set_username", (username) => {
      addUser(socket.id, username);
      console.log(users.length);
      socket.emit("receive_user", user);
    });
  });
  
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});