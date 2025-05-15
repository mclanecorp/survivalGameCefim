import { Cells } from './Cells';
import { GameStore } from '../GameStore';

export function Map() {
    const GRID_SIZE = 10;
    const CELL_SIZE = 40;

    const resources = GameStore((state) => state.resources);
    const map = GameStore((state) => state.map);
    const updateWood = GameStore((state) => state.updateWood);
    const addSurvivor = GameStore((state) => state.addSurvivor);
    const updateCell = GameStore((state) => state.updateCell);

    const handleCellClick = (row, col) => {
        if (map[row][col].type === 'empty' && resources.wood >= 5) {
            updateCell(row, col, 'house');
            updateWood(-5);
            addSurvivor(2);
        }
    };

    return (
        <div className="relative">
            <div
                className="grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
                    gap: '1px',
                    background: '#34495e',
                    padding: '1px',
                    border: '2px solid #34495e',
                    borderRadius: '8px'
                }}
            >
                {map.map((row, rowIndex) => (
                    row.map((cell, colIndex) => (
                        <Cells
                            key={`${rowIndex}-${colIndex}`}
                            cell={cell}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            CELL_SIZE={CELL_SIZE}
                            handleCellClick={handleCellClick}
                        />
                    ))
                ))}
            </div>
        </div>
    );
}