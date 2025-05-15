import { create } from 'zustand';

const GRID_SIZE = 10;

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

export const CellStore = create(set => ({
    map: initialMap(),

    resetMap: () => set({map: initialMap()}),

    updateCell: (row, col, newType) => set((state) => {
        const newMap = [...state.map];
        newMap[row][col] = { type: newType };
        return { map: newMap };
    }),
})) 