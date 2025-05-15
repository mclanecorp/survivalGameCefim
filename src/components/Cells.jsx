import { GameStore } from '../GameStore';

export function Cells({ cell, rowIndex, colIndex, CELL_SIZE, handleCellClick }) {
    const getCellIcon = GameStore((state) => state.getCellIcon);

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            className="cell hover:opacity-80 cursor-pointer transition-opacity"
            style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: '#2872ba',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={() => handleCellClick(rowIndex, colIndex)}
        >
            {cell.type && getCellIcon(cell.type) && (
                <img
                    src={getCellIcon(cell.type)}
                    alt={cell.type}
                    className="w-8 h-8"
                />
            )}
        </div>
    );
}