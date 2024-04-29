import './Chessboard.css';
import Tile from '../Tile';
import Piece from '../Piece';
import { useBoardContext } from '../../context/BoardContext';
import PromotionPopup from '../../components/PromotionPopup'

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

export default function Chessboard() {
    const { player, pieces } = useBoardContext();

    let board: JSX.Element[] = [];

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

    return (
        <>
            <div id="chessboard">{board}</div>
            <PromotionPopup />
        </>
    );
}
