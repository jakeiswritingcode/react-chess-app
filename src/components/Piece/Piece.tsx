import './Piece.css';
import pieceSrcMap from './pieceSrcMap'

interface PieceProps {
    color: string
    type: string
}

export default function Piece({color, type}: PieceProps) {
    const imageUrl = pieceSrcMap[`${color} ${type}`];
    const altText = `${color} ${type}`;

    return <img className="piece" src={imageUrl} alt={altText} />
}
