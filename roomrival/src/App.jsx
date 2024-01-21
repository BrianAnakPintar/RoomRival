import React from 'react';
import './App.css';
import io from "socket.io-client";
import { useEffect } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const sendMessage = () => {
    let username = document.getElementById("username");
    socket.emit("set_username", username.value);
  };

  const clearData = () => {
    socket.emit("clear");
  }

  useEffect(() => {
    socket.on("receive_user", (data) => {
      alert(data);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <input id="username" />
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearData}>Clear</button>
      </header>
    </div>
  );
}

export default App;
