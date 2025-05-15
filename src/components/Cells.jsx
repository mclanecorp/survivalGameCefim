import { GameStore } from '../GameStore';

export function Cells({ cell, rowIndex, colIndex, CELL_SIZE, handleCellClick }) {
    const getCellIcon = GameStore((state) => state.getCellIcon);
    const addSurvivorToCell = GameStore((state) => state.addSurvivorToCell);
    const resources = GameStore((state) => state.resources);

    const handleClick = () => {
        if (cell.type === 'forest' && resources.survivor > 0) {
            addSurvivorToCell(rowIndex, colIndex);
        } else {
            handleCellClick(rowIndex, colIndex);
        }
    };

    return (
        <div
            key={`${rowIndex}-${colIndex}`}
            className="cell hover:opacity-80 cursor-pointer transition-opacity relative"
            style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: '#2872ba',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={handleClick}
        >
            {cell.type && getCellIcon(cell.type) && (
                <img
                    src={getCellIcon(cell.type)}
                    alt={cell.type}
                    className="w-8 h-8"
                />
            )}
            {cell.survivors > 0 && (
                <div className="absolute bottom-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cell.survivors}
                </div>
            )}
        </div>
    );
}