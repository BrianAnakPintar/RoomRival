import React, {useEffect} from 'react';
import './App.css';
// import Navbar from "./components/navbar";
import { Html5QrcodeScanner} from "html5-qrcode";
import io from "socket.io-client";
import {useState} from "react";
import Login from "./components/Login";
import Map from "./components/Map";
import BasicMap from "./Basic";
import Navbar from "./components/Navbar";

const socket = io.connect("http://localhost:3001");

function App() {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        }, true);

        scanner.render(scanSuccess, scanError)

        function scanSuccess(result) {
            scanner.clear();
            console.log(result)
        }

        function scanError(result) {
            console.warn(result)
        }

        socket.on("receive_user", (user) => {
            alert(user.user);
        });
    }, [socket]);

    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(true);

    const handleUsernameSubmit = (enteredUsername) => {
        setUsername(enteredUsername);
        socket.emit("set_username", enteredUsername);
        setShowPopup(false);

    };

    return (
    <div className="App">
        {/*<Navbar title={"Room Rival"}/>*/}
        <div id="reader"></div>
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
