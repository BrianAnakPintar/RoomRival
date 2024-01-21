const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let users = new Map();
let rooms = [];

/*
users
{
  id,
  username,
  points
}

rooms are order by roomID (array index)
{
  pointsWorth,
  currentUserID
}

*/

function addUser(id, username) {
  let user = {username: username, points: 0};
  users.set(id, user);
}

function clearData() {
  users = new Map();
  for(room of rooms) {
    room.currentUserId = undefined;
  }
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
      console.log(users.get(socket.id));
      socket.emit("receive_user", users.size);
    });
    socket.on("clear", () => {
      clearData();
    })
  });
  
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});