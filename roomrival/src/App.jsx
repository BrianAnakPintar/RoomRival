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
import AppBody from "./components/AppBody";
import Leaderboard from "./components/Leaderboard";

const socket = io.connect("http://localhost:3001");

function App() {
    // let roomColorIdx = 2;
    // let roomDataIdx = 2;
    let changeColorInfo = true;

    const [roomColorIdx, setRoomColorIdx] = useState(-1);
    const [roomDataIdx, setRoomDataIdx] = useState(99);

    useEffect(() => {
        socket.on("receive_user", (data) => {
            // alert(data);
        });

        socket.on("update_room", (roomId, color) => {
            setRoomColorIdx(color);
            setRoomDataIdx(roomId);
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
        console.log("b");
        socket.emit("room_update", num);
    };


    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        socket.on("point_update", (data) => {
            setLeaderboardData(data);
        });

    }, [socket]);

    // const leaderboardTemp = [
    //     { username: 'Alice', score: 1200 },
    //     { username: 'Bob', score: 950 },
    //     { username: 'Charlie', score: 800 },
    //     { username: 'David', score: 1100 },
    // ];


    const handleLeaderboardClick = () => {
        setShowLeaderboard(true);
    };
    const handleCloseLeaderboard = () => {
        setShowLeaderboard(false);
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
                <BasicMap showPopup={showPopup} changeColorRoomIdx={roomDataIdx} changeColorRoomColor={roomColorIdx}/>
                {showPopup && (
                    <Login onSubmit={handleUsernameSubmit} showPopup={showPopup}/>
                )}
            </div>
            {showScanner && (
                <QRScannerComponent handleSubmit={sendPointUpdate} onToggleScanner={handleToggleScanner}/>
            )}
            {showLeaderboard && (
                <Leaderboard handleOpenLB={handleLeaderboardClick} handleCloseLB={handleCloseLeaderboard} leaderboardData={leaderboardData} />
            )}
            </body>
            {!showPopup && (
                <Navbar className="navbar" onToggleScanner={handleToggleScanner} handleOpenLB={handleLeaderboardClick}  />
            )}
        </div>
    );
}

export default App;