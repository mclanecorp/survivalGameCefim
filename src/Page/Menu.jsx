import {useEffect, useState} from "react";
import {Button} from "../components/Button.jsx";
import { useNavigate } from 'react-router-dom';
import { GameStore } from '../GameStore';

export function Menu({version}) {
    const navigate = useNavigate();
    const resetGame = GameStore((state) => state.resetGame);
    const subtitles = [
        "You think you can beat the game",
        "You think you can survive the game",
        "Welcome to your worst nightmare",
        "Can you make it to the end?",
        "Every choice matters",
        "Your destiny awaits",
        "There's no turning back now",
        "The game has just begun",
        "Are you ready to face your fears?",
        "Only the strongest survive",
        "Your journey starts here",
        "Death is just the beginning",
        "Challenge accepted?",
        "The darkness awaits you",
        "Your skills will be tested"
    ];

    const handleCreditsClick = () => {
        console.log("Button clicked!");
        alert("By Mclanecorp");
    };

    const handlePlayClick = () => {
        resetGame();
        navigate('/game');
    };

    const [currentSubtitle, setCurrentSubtitle] = useState(subtitles[0]);
    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * subtitles.length);
            setCurrentSubtitle(subtitles[randomIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300">
            <div className="flex flex-col items-center justify-center">
                <img className="w-10 animate-bounce" src="/barn.svg" alt=""/>

                <h1 className="text-6xl font-bold">Survive React</h1>
                <h2 className='rotate-5  mb-8 animate-pulse'>{currentSubtitle}</h2>
            
                <div className="flex flex-col items-center justify-center">
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-4 items-center">
                            <Button
                                title="Play"
                                color="bg-gradient-to-r from-red-600 to-red-500"
                                onClick={handlePlayClick}
                            />
                            <Button
                                title="Settings"
                                color="bg-gradient-to-r from-blue-600 to-blue-500"
                                onClick={() => navigate('/settings')}
                            />
                            <Button
                                title="Credits"
                                color="bg-gradient-to-r from-gray-800 to-gray-700"
                                onClick={handleCreditsClick}
                            />
                        </div>
                    </div>
                    <p>{version}</p>
                </div>
            </div>
        </div>
    );
}