import './Piece.css';

interface PieceProps {
    color: string
    type: string
}

export default function Piece({color, type}: PieceProps) {
    if (type === "Rook") {
        return <img className="piece" src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg" alt="Rook" />
    }
    return <img />;
}
