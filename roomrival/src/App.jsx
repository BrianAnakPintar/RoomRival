import React, {useEffect} from 'react';
import './App.css';
import io from "socket.io-client";
import QrScanner from 'qr-scanner';
import QRScannerComponent from "./components/QRScannerComponent";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

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


    const sendPointUpdate = (num) => {
        socket.emit("point_update", num);
    };

    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*</header>*/}
            <body className="App-body">
                <QRScannerComponent/>
                <div id="app"></div>
                <button onClick={sendMessage}>Send</button>
                <Login/>
                <Navbar className="navbar"/>
            </body>
        </div>
    );
}

export default App;