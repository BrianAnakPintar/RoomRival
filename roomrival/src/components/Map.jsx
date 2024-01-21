import React, {useState} from 'react';
import Leaderboard from "./Leaderboard";
const Map = ({ username }) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);

    const handleLeaderboardClick = () => {
        setShowLeaderboard(true);
    };



    return (
        <div>
            <h1>Welcome, {username}!</h1>
            {/* the map code */}
        </div>
    );
};

export default Map;