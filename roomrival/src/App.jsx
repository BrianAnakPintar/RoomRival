import React, {useEffect} from 'react';
import './App.css';
// import Navbar from "./components/navbar";
import io from "socket.io-client";
import {useState} from "react";
import QRScannerComponent from "./components/QRScannerComponent";
import Login from "./components/Login";
import Map from "./components/Map";
import BasicMap from "./Basic";
import Navbar from "./components/Navbar";
import AppBody from "./components/AppBody";

const socket = io.connect("http://localhost:3001");

function App() {
    useEffect(() => {
        socket.on("receive_user", (data) => {
            // alert(data);
        });

    }, [socket]);

    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(true);
    const [showScanner, setShowScanner] = useState(false);

    const handleUsernameSubmit = (enteredUsername) => {
        setUsername(enteredUsername);
        socket.emit("set_username", enteredUsername);
        setShowPopup(false);

    };

    const handleToggleScanner = () => {
        setShowScanner(!showScanner);
    };

    const sendPointUpdate = (num) => {
        socket.emit("point_update", num);
    };

    return (
        <div className="App">
            {/*<Navbar title={"Room Rival"}/>*/}
            {/*<div className="App-header">*/}
            {/*    /!*<QRScannerComponent/>*!/*/}
            {/*</div>*/}
            {/*<h1>Welcome!</h1>*/}
            <div id="app"></div>

            {/*{showPopup && (*/}
            {/*    <Login onSubmit={handleUsernameSubmit}/>*/}
            {/*)}*/}

            {/*{!showPopup && (*/}
            {/*    <Map username={username}/>*/}
            {/*)}*/}

            {/*<header className="App-header">*/}
            {/*</header>*/}
            <body className="App-body">
            {/*<AppBody showPopup={showPopup}/>*/}
            <div className="flex flex-wrap w-full">
                <BasicMap showPopup={showPopup}/>
                {showPopup && (
                    <Login onSubmit={handleUsernameSubmit} showPopup={showPopup}/>
                )}
            </div>
            {showScanner && (
                <QRScannerComponent onToggleScanner={handleToggleScanner}/>
            )}
            <div></div>
            </body>
            {!showPopup && (
                <Navbar className="navbar" onToggleScanner={handleToggleScanner}/>
            )}
        </div>
    );
}

export default App;