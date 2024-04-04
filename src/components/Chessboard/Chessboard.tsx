import { useState } from 'react';
import './Chessboard.css';
import Tile from '../Tile/Tile';
import Piece from '../Piece/Piece';
import initialPositions from '../../data/initialPositions';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

export default function Chessboard() {
    let board: JSX.Element[] = [];

    const [piecePosition, setPiecePosition] = useState(initialPositions);

    for (let i = 0; i < verticalAxis.length; i++) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            const tileId = `${horizontalAxis[j]}${verticalAxis[i]}`;
            const piece = piecePosition[tileId];
            
            board.push(
                <Tile file={horizontalAxis[j]} rank={verticalAxis[i]}>
                    {piece && <Piece color={piece.color} type={piece.type} />}
                </Tile>
            );
        }
    }

    return <div id="chessboard">{board}</div>;
}
