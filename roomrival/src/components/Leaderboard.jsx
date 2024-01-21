import React from 'react';

const Leaderboard = ({handleOpenLB, handleCloseLB, leaderboardData}) => {
    return (
        <div className="overflow-x-auto">
            <modal className="modal" open>
                <div className="modal-box text-sm">
                    <h1 className="text-lg font-semibold">Leaderboard 🏆</h1>
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
                    <div className="pt-2">
                        <button className="btn btn-outline btn-sm" onClick={handleCloseLB}>Close Leaderboard</button>
                    </div>
                </div>
            </modal>
        </div>
    );
};

export default Leaderboard;

