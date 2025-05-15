// components/Leaderboards.jsx
import {useState} from "react";

export function Leaderboards() {
    const [scores, setScores] = useState(() => {
        const savedScores = localStorage.getItem('gameScores');
        return savedScores ? JSON.parse(savedScores) : [];
    });

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">Tableau des Scores</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-400 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Position</th>
                            <th className="px-6 py-3 text-left">Nom</th>
                            <th className="px-6 py-3 text-left">Temps de survie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores
                            .sort((a, b) => b.survivedTime - a.survivedTime)
                            .slice(0, 10)
                            .map((score, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{score.playerName}</td>
                                <td className="px-6 py-4">{formatTime(score.survivedTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}



export function saveScore(playerName, survivedTime) {
    const savedScores = localStorage.getItem('gameScores');
    const scores = savedScores ? JSON.parse(savedScores) : [];

    scores.push({
        playerName,
        survivedTime,
        date: new Date().toISOString()
    });

    scores.sort((a, b) => b.survivedTime - a.survivedTime);
    const topScores = scores.slice(0, 100);
    localStorage.setItem('gameScores', JSON.stringify(topScores));
}