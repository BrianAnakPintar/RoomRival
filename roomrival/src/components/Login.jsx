import React, { useState } from 'react';
const Login = ({onSubmit}) => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const handleSubmit = () => {
        onSubmit(enteredUsername);
    };

    return (
        <div className="flex items-center justify-center h-screen">
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
    );
};
export default Login;

//
// const UsernamePopup = ({ onSubmit }) => {
//     const [enteredUsername, setEnteredUsername] = useState('');
//
//     const handleSubmit = () => {
//         onSubmit(enteredUsername);
//     };
//
//     return (
//         <div>
//             <h2>Enter your username:</h2>
//             <input
//                 type="text"
//                 value={enteredUsername}
//                 onChange={(e) => setEnteredUsername(e.target.value)}
//             />
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//     );
// };