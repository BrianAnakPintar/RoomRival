import React, {useEffect, useState} from 'react';

const Login = ({onSubmit, showPopup}) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [pageDimensions, setPageDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setPageDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup: Remove event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures the effect runs only once on mount

    const isWidePage = () => {
        return pageDimensions.width > pageDimensions.height;
    }

    const setPageLayout = () => {
        console.log('here', showPopup, isWidePage())
        if (showPopup && isWidePage()) {
            return 'w-1/2';
        } else if (showPopup && !isWidePage()) {
            return 'w-full h-1/2';
        } else {
            return 'w-full';
        }
    }

    const setPageLayoutLogin = () => {
        if (showPopup && !isWidePage()) {
            return '50vh';
        } else {
            return '100vh';
        }
    }

    const handleSubmit = () => {
        onSubmit(enteredUsername);
    };

    return (
        // <div className={`${showPopup ? 'w-1/2 ml-auto' : 'w-full'}`}>
        <div className={`${setPageLayout()}`} style={{ background: isWidePage() ? 'linear-gradient(to right, #323540, #898ea1)' : 'linear-gradient(to bottom, #323540, #898ea1)'}}>
            <div className="flex items-center justify-center" style={{ height: setPageLayoutLogin() }}>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title pb-2">RoomRival</h2>
                        <input
                            type="text"
                            placeholder="username"
                            className="input input-bordered input-sm w-full max-w-xs py-2"
                            value={enteredUsername}
                            onChange={(e) => setEnteredUsername(e.target.value)}
                        />
                        <div className="card-actions justify-start pt-2">
                            <button className="btn btn-sm btn-outline" onClick={handleSubmit}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;