import {Button} from "../components/Button";
import {Ressources} from "../components/Ressources.jsx";
import {Quests} from "../components/Quests.jsx";
import {useEffect, useState} from 'react';
import {Map} from "../components/Map.jsx";
import {GameOverScreen} from "./GameOverScreen.jsx";
import { GameStore } from '../GameStore';
import { useNavigate } from 'react-router-dom';

export function Game() {
    const navigate = useNavigate();
    const resources = GameStore((state) => state.resources);
    const gameStartTime = GameStore((state) => state.gameStartTime);
    const survivedTime = GameStore((state) => state.survivedTime);
    const isGameOver = GameStore((state) => state.isGameOver);
    const mapKey = GameStore((state) => state.mapKey);
    const playerName = GameStore((state) => state.playerName);
    const setGameOver = GameStore((state) => state.setGameOver);
    const setSurvivedTime = GameStore((state) => state.setSurvivedTime);
    const setPlayerName = GameStore((state) => state.setPlayerName);
    const resetGame = GameStore((state) => state.resetGame);
    const consumeMeat = GameStore((state) => state.consumeMeat);
    const produceResources = GameStore((state) => state.produceResources);
    const map = GameStore((state) => state.map);

    useEffect(() => {
        if (resources.meat <= 0) {
            setGameOver(true);
        }
    }, [resources.meat, setGameOver]);

    // Timer combiné pour le temps de survie, la consommation de nourriture et la production de ressources
    useEffect(() => {
        if (!isGameOver) {
            const survivalTimer = setInterval(() => {
                setSurvivedTime(Math.floor((Date.now() - gameStartTime) / 1000));
            }, 1000);

            const foodTimer = setInterval(() => {
                // Calculer le nombre total de survivants sur la carte
                const totalSurvivorsOnMap = map.reduce((total, row) => {
                    return total + row.reduce((rowTotal, cell) => rowTotal + (cell.survivors || 0), 0);
                }, 0);
                consumeMeat(totalSurvivorsOnMap);
            }, 10000);

            const resourceTimer = setInterval(() => {
                produceResources();
            }, 5000);

            return () => {
                clearInterval(survivalTimer);
                clearInterval(foodTimer);
                clearInterval(resourceTimer);
            };
        }
    }, [isGameOver, gameStartTime, setSurvivedTime, consumeMeat, produceResources, map]);

    const handleRestart = () => {
        resetGame();
        navigate('/game');
    };

    const handleQuit = () => {
        navigate('/');
    };

    const [quests] = useState([
        {
            id: 1,
            title: "Exploration de la Forêt",
            description: "Envoyer 3 survivants explorer la forêt mystérieuse",
            reward: "20 unités de bois",
            completed: false
        },
        {
            id: 2,
            title: "Chasse aux Sangliers",
            description: "Obtenir 30 unités de viande en chassant",
            reward: "5 survivants supplémentaires",
            completed: false
        },
        {
            id: 3,
            title: "Construction d'un Abri",
            description: "Utiliser 50 bois et 30 pierres pour construire un abri",
            reward: "Augmentation de la capacité de survivants",
            completed: false
        },
        {
            id: 4,
            title: "Mine de Pierre",
            description: "Récolter 100 pierres dans la carrière",
            reward: "2 outils améliorés",
            completed: false
        },
        {
            id: 5,
            title: "Festin Communautaire",
            description: "Préparer un festin avec 40 viandes",
            reward: "Moral des survivants amélioré",
            completed: false
        }
    ]);

    if (isGameOver) {
        return (
            <GameOverScreen
                survivedTime={survivedTime}
                playerName={playerName}
                setPlayerName={setPlayerName}
                onRestart={handleRestart}
                onQuit={handleQuit}
            />
        );
    }

    return (
        <div className="flex flex-col bg-gray-300 px-5 min-h-screen">
            <div className="flex flex-row items-center justify-between w-full mb-8">
                <Ressources />
                <h1 className="text-4xl font-bold">Game</h1>
                <Button
                    title="Retour"
                    color="bg-gradient-to-r from-blue-600 to-blue-500"
                    onClick={handleQuit}
                />
            </div>
            <div className="flex flex-row mr-40">
                <div className="w-80">
                    <Quests quests={quests}/>
                </div>
                <div className="flex-1 flex justify-center">
                    <Map key={mapKey} />
                </div>
            </div>
        </div>
    );
}