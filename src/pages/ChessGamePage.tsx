import { WSGameProvider } from '../context/WSGameContext';
import { BoardProvider } from '../context/BoardContext';
import Chessboard from '../components/Chessboard';

function ChessGamePage() {
    return (
        <WSGameProvider>
            <BoardProvider>
                <Chessboard />
            </BoardProvider>
        </WSGameProvider>
    );
  }
  
  export default ChessGamePage;