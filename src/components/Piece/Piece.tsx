import './Piece.css';
import pieceSrcMap from './pieceSrcMap'

interface PieceProps {
    color: string
    type: string
    position: string
}

export default function Piece({ color, type, position }: PieceProps) {
    const onDragStart = (e: React.DragEvent<HTMLImageElement>) => {
        const data = JSON.stringify({ type, color, position });
        e.dataTransfer.setData("piece", data);
    };

    return <img
        className="piece"
        src={pieceSrcMap[`${color} ${type}`]}
        alt={`${color} ${type}`}
        
        draggable="true"
        onDragStart={onDragStart}
    />
}
