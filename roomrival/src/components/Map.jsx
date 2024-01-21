import React, {useState} from 'react';
import Leaderboard from "./Leaderboard";
const Map = ({ username }) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState([]);

    const handleLeaderboardClick = () => {
        setShowLeaderboard(true);
    };
    const handleCloseLeaderboard = () => {
        setShowLeaderboard(false);
    };

    return (
        <div>
            <h1>Welcome, {username}!</h1>


            <button onClick={handleLeaderboardClick}>Open Leaderboard</button>
            {showLeaderboard && (
                <Leaderboard onClose={handleCloseLeaderboard} leaderboardData={leaderboardData} />
            )}

            {/* the map code */}
        </div>
    );
};

export default Map;