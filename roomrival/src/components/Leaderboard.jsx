import React from 'react';
const Leaderboard = ({ onClose, leaderboardData }) => {
    return (
        <div className="overflow-x-auto">
            <button onClick={onClose}>Close Leaderboard</button>
            <table className="table table-zebra">
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {leaderboardData.map((entry, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{entry.username}</td>
                        <td>{entry.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

