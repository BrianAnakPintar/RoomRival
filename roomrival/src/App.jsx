import React, {useEffect} from 'react';
import './App.css';
import io from "socket.io-client";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {Html5QrcodeScanner} from "html5-qrcode";

const socket = io.connect("http://localhost:3001");

function App() {
    const sendMessage = () => {
        let username = document.getElementById("username");
        socket.emit("set_username", username.value);
    };

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
    }, []);

    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*</header>*/}
            <body className="App-body">
                <div id="reader" className="text-white"></div>
                <div id="app"></div>
                <button onClick={sendMessage}>Send</button>
                <Login/>
                <Navbar className="navbar"/>
            </body>
        </div>
    );
}

export default App;
