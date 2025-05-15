import { GameStore } from '../GameStore';
import { Leaderboards, saveScore } from "../components/Leaderboards.jsx";

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

export function GameOverScreen({ playerName, setPlayerName, survivedTime, onRestart }) {
    const resetResources = GameStore((state) => state.resetResources);

    const handleSubmit = () => {
        saveScore(playerName, survivedTime);
    };

    const handleRestart = () => {
        resetResources();
        onRestart();
    };

    return (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold">Game Over</h1>
            <h2 className='rotate-5 mb-2 animate-pulse'>Leaderboard</h2>
            <p className="mb-8">Temps de survie : {formatTime(survivedTime)}</p>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex gap-5 mb-4">
                    <div>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="border p-2 h-10 rounded w-full"
                            maxLength={20}
                            placeholder="Votre nom"
                        />
                    </div>
                    <button
                        className={`h-10 px-4 rounded ${
                            playerName.length >= 3 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={playerName.length < 3}
                        onClick={handleSubmit}
                    >
                        Sauvegarder le score
                    </button>
                </div>
                <button
                    onClick={handleRestart}
                    className="w-full h-10 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Recommencer une partie
                </button>
            </div>
            <div className="mt-10">
                <Leaderboards />
            </div>
        </div>
    );
}