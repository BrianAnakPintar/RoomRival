import React, {useEffect} from 'react';
import './App.css';
import io from "socket.io-client";
import QrScanner from 'qr-scanner';
import QRScannerComponent from "./components/QRScannerComponent";

const socket = io.connect("http://localhost:3001");

function App() {

    useEffect(() => {
        socket.on("receive_user", (data) => {
            alert(data);
        });

    }, [socket]);

    const sendMessage = () => {
        let username = document.getElementById("username");
        socket.emit("set_username", username.value);
    };

    const sendPointUpdate = (num) => {
        socket.emit("point_update", num);
    };

    const clearData = () => {
        socket.emit("clear");
    }

  return (
    <div className="App">
        <QRScannerComponent/>
        <input id="username" />
        <button onClick={sendMessage}>Send</button>
        <button onClick={clearData}>Clear</button>
    </div>
  );
}

export default App;