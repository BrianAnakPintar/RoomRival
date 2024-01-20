import React from 'react';
import './App.css';
import io from "socket.io-client";
import {useEffect} from "react";
import Login from "./components/Login";

const socket = io.connect("http://localhost:3001");

function App() {
  const sendMessage = () => {
    let username = document.getElementById("username");
    socket.emit("set_username", username.value);
  };

  useEffect(() => {
    socket.on("receive_user", (data) => {
      alert(data.id);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <input id="username" />
        <button onClick={sendMessage}>Send</button>
        <Login/>
      </header>
    </div>
  );
}

export default App;