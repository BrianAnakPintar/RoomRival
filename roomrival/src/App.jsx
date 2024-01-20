import React, {useEffect} from 'react';
import './App.css';
import Navbar from "./components/navbar";
import AMSMap from "./components/ams_map";
import { Html5QrcodeScanner} from "html5-qrcode";

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
    }, []);

  return (
    <div className="App">
        <Navbar title={"Room Rival"}/>
        <div id="reader"></div>
        <h1>Welcome!</h1>
        <div id="app"></div>
    </div>
  );
}

export default App;
