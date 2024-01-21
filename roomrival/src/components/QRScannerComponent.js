import React, { useEffect } from 'react';
import QRScanner from 'qr-scanner'; // Replace with the actual library import

const QRScannerComponent = ({handleSubmit}) => {
    useEffect(() => {
        const video = document.getElementById('qr-video');
        const videoContainer = document.getElementById('video-container');
        const camQrResult = document.getElementById('cam-qr-result');
        let scanner;

        const handleStuff = (e) => {
            handleSubmit(e);
        }

        function setResult(label, result) {
            alert(result.data);
            handleStuff(result.data);
            scanner.stop();
        }

        const startScanner = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;

                scanner = new QRScanner(video, (result) => setResult(camQrResult, result), {
                    onDecodeError: (error) => {
                        camQrResult.textContent = error;
                        camQrResult.style.color = 'inherit';
                    },
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                });

                await scanner.start();

                QRScanner.listCameras(true).then((cameras) => {
                    const selectCamera = document.getElementById('select-camera');
                    cameras.forEach((camera) => {
                        const option = document.createElement('option');
                        option.value = camera.id;
                        option.text = camera.label;
                        selectCamera.appendChild(option);
                    });
                });
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                // Pause the video stream and stop the scanner when the window loses focus
                video.pause();
                if (scanner) {
                    scanner.stop();
                }
            } else {
                // Resume the video stream and restart the scanner when the window regains focus
                video.play().catch((error) => console.error('Error playing video:', error));
                if (scanner) {
                    startScanner();
                }
            }
        };

        // Add event listeners for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Start the scanner when the component mounts
        startScanner();

        return () => {
            // Cleanup: Remove event listeners and stop the scanner when the component is unmounted
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (scanner) {
                scanner.stop();
            }
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        // <div className="fixed h-screen">
             <modal className="modal" open={true}>
                <div className="modal-box text-sm">
                    <div id="video-container">
                        <video id="qr-video" autoPlay playsInline></video>
                    </div>
                    <div className="pt-4">
                        <select id="select-camera"></select>
                        <div id="cam-qr-result"></div>
                    </div>
                </div>
                <button>Close</button>
            </modal>
        // </div>
    );
};

export default QRScannerComponent;
