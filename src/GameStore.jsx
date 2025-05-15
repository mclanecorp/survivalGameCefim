import {create} from 'zustand';
import tree2Icon from '/tree2.svg';
import cabinIcon from '/cabin.svg';
import mountainIcon from '/mountain.svg';

const INITIAL_RESOURCES = {
    survivor: 0,
    meat: 4,
    wood: 10,
    stone: 75
};

const GRID_SIZE = 10;

const CELL_TYPES = {
    empty: {
        name: 'Vide',
        icon: null
    },
    forest: {
        name: 'Forêt',
        icon: tree2Icon
    },
    house: {
        name: 'Maison',
        icon: cabinIcon
    },
    stone: {
        name: 'Pierre',
        icon: mountainIcon
    }
};

const initialMap = () => {
    const map = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        const row = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            const random = Math.random();
            let type = 'empty';
            if (random < 0.2) {
                type = 'forest';
            } else if (random < 0.30) {
                type = 'stone';
            }
            row.push({type});
        }
        map.push(row);
    }
    return map;
};

export const GameStore = create(set => ({
    // Game state
    gameStartTime: Date.now(),
    survivedTime: 0,
    isGameOver: false,
    mapKey: 0,
    playerName: '',

    // Resources
    resources: INITIAL_RESOURCES,
    resetResources: () => set({resources: INITIAL_RESOURCES}),
    addSurvivor: (amount) => set((state) => ({
        resources: {
            ...state.resources,
            survivor: state.resources.survivor + amount
        }
    })),
    consumeMeat: (amount) => set((state) => ({
        resources: {
            ...state.resources,
            meat: Math.max(0, state.resources.meat - amount)
        }
    })),
    updateWood: (amount) => set((state) => ({
        resources: {
            ...state.resources,
            wood: Math.max(0, state.resources.wood + amount)
        }
    })),

    // Map
    map: initialMap(),
    resetMap: () => set({map: initialMap()}),
    updateCell: (row, col, newType) => set((state) => {
        const newMap = [...state.map];
        newMap[row][col] = { type: newType };
        return { map: newMap };
    }),

    // Cell
    getCellIcon: (type) => CELL_TYPES[type]?.icon || null,

    // Game actions
    setGameOver: (value) => set({ isGameOver: value }),
    setSurvivedTime: (time) => set({ survivedTime: time }),
    setPlayerName: (name) => set({ playerName: name }),
    incrementMapKey: () => set((state) => ({ mapKey: state.mapKey + 1 })),
    resetGame: () => set({
        gameStartTime: Date.now(),
        survivedTime: 0,
        isGameOver: false,
        mapKey: 0,
        playerName: '',
        resources: INITIAL_RESOURCES,
        map: initialMap()
    })
}))