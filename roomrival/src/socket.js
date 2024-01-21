const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let users = new Map();

let rooms = [
    {pointsWorth: 5, currentUserId: undefined, roomName: "Grand noodle"},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 2, currentUserId:  undefined},
    {pointsWorth: 1, currentUserId:  undefined},
    {pointsWorth: 3, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined},
    {pointsWorth: 1, currentUserId: undefined}
];


let start = Date.now();
const gameLength = 10000;
let timerIntervalId = 0;

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
  currentUserId
}

*/

function startTimer(socket) {
  start = Date.now();
  timerIntervalId = setInterval((socket) => {
    let timeLeft = gameLength - (Date.now() - start)
    socket.emit("receive_user", timeLeft);
    if (timeLeft < 0) {
      clearInterval(timerIntervalId);
    }
  }, 1000, socket);
}

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

function clearData() {
    users = new Map();
    for(room of rooms) {
        room.currentUserId = undefined;
    }
}

function claimRoom(roomId, userId) {
    let oldUser = users.get(rooms[roomId].currentUserId);
    let pts = rooms[roomId].pointsWorth;

    let newUser = users.get(userId);
    if (oldUser)
        oldUser.points -= pts;
    newUser.points += pts;

    // TODO: Enter code to update the room color with room id.
    // Do a socket.emit to the users here!

    // TODO: Set a timer for this room? Can be implemented later.

    console.log(roomId);
    console.log(userId);
}

function sortUsers() {
    let arr = users.values().toArray();
    arr.sort((a, b) => b.points - a.points);
    return arr;
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
        console.log(users);
        socket.emit("receive_user", users.size);
    });
    socket.on("room_update", (roomId) => {
        claimRoom(roomId, socket.id);
    });

  });
  socket.on("clear", () => {
    clearData();
  })
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});