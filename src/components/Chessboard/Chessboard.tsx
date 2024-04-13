import './Chessboard.css';
import Tile from '../Tile';
import Piece from '../Piece';
import { useBoardContext } from '../../context/BoardContext';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

export default function Chessboard() {
    let board: JSX.Element[] = [];

    // TODO: log captured pieces for each state and display

    const { pieces, movePiece } = useBoardContext();

    for (let i = 0; i < verticalAxis.length; i++) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            const tileId = `${horizontalAxis[j]}${verticalAxis[i]}`;
            const piece = pieces[tileId];
            
            board.push(
                <Tile file={horizontalAxis[j]} rank={verticalAxis[i]}>
                    {piece && <Piece color={piece.color} type={piece.type} position={`${horizontalAxis[j]}${verticalAxis[i]}`} />}
                </Tile>
            );
        }
    }

    return <div id="chessboard">{board}</div>;
}
