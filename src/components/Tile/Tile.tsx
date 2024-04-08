import './Tile.css';
import { useBoardContext } from '../../context/BoardContext';

interface TileProps {
    file: string
    rank: string
    children?: React.ReactNode;
}

export default function Tile({ file, rank, children }: TileProps) {
    const { pieces, movePiece } = useBoardContext();
    
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
        // TODO: highlight square 
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const { color, type, position } = JSON.parse(e.dataTransfer.getData("piece"));
        movePiece(position, `${file+rank}`);
    };

    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankIndex = rank.charCodeAt(0) - '1'.charCodeAt(0);
    const tileClass = (fileIndex + rankIndex) % 2 !== 0 ? "white-tile" : "black-tile";

    return (
        <div
            id={file+rank}
            className={tileClass}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {children}
        </div>
    );
}
