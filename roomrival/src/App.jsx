import React, {useEffect} from 'react';
import './App.css';
// import Navbar from "./components/navbar";
import io from "socket.io-client";
import {useState} from "react";
import QrScanner from 'qr-scanner';
import QRScannerComponent from "./components/QRScannerComponent";
import Login from "./components/Login";
import Map from "./components/Map";
import BasicMap from "./Basic";
import Navbar from "./components/Navbar";

const socket = io.connect("http://localhost:3001");

function App() {
    useEffect(() => {
        socket.on("receive_user", (data) => {
            alert(data);
        });

    }, [socket]);

    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(true);

    const handleUsernameSubmit = (enteredUsername) => {
        setUsername(enteredUsername);
        socket.emit("set_username", enteredUsername);
        setShowPopup(false);

    };
    const sendPointUpdate = (num) => {
        socket.emit("point_update", num);
    };

    return (
    <div className="App">
        {/*<Navbar title={"Room Rival"}/>*/}
        <div className="App-header">
            <QRScannerComponent/>
        </div>
        <h1>Welcome!</h1>
        <div id="app"></div>

        {showPopup && (
            <Login onSubmit={handleUsernameSubmit} />
        )}

        {!showPopup && (
            <Map username={username} />
        )}

        {/*<header className="App-header">*/}
        {/*</header>*/}
        <body className="App-body">
        <BasicMap />
        <div id="reader" className="text-white"></div>
        <div id="app"></div>
        <Login/>
        <Navbar className="navbar"/>
        </body>
    </div>
  );
}

export default App;