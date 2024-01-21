const express = require("express");
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

let users = new Map();

let rooms = [
    {pointsWorth: 5, currentUserId: undefined, roomName: "Women's Washroom"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "ELEV"},
    {pointsWorth: 2, currentUserId: undefined, roomName: "INS Market LL301"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "The Soup Market LL303"},
    {pointsWorth: 3, currentUserId: undefined, roomName: "Shapecut Hair Design LL401"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "Campus Vision LL302"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "Flavour Lab LL104"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "Stairs"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "LL201"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "Grand Noodle Emporium LL105"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "The Commons LL102"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "The Pit LL01"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "CITR Radio LL502"},
    {pointsWorth: 1, currentUserId: undefined, roomName: "The Delly LL304"},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
    {pointsWorth: 1, currentUserId: undefined, roomName: ""},
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
    let user = {username: username, points: 0, indexId: users.size};
    users.set(id, user);
}

function clearData() {
    users = new Map();
    for (room of rooms) {
        room.currentUserId = undefined;
    }
}

function claimRoom(roomId, userId) {
    let oldUser = users.get(rooms[roomId].currentUserId);
    let pts = rooms[roomId].pointsWorth;

    let newUser = users.get(userId);
    if (oldUser)
        oldUser.points -= pts;
    console.log("YAYAYAYA");
    console.log(userId);
    console.log(newUser);
    if (newUser)
        newUser.points += pts;
}

function sortUsers() {
    let arr = Array.from(users.values())
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
        // Socket emit to update room color to user.
        let userIdx = users.get(socket.id).indexId;
        console.log("A");
        io.emit("update_room", roomId, userIdx);
        console.log("B");
        let arr = sortUsers();
        io.emit("point_update", arr);
    });
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
    // startTimer();
});