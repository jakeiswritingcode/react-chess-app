import { GameProvider } from '../context/GameContext';
import { ChatProvider } from '../context/ChatContext';
import ChatWindow from '../components/ChatWindow';
import { BoardProvider } from '../context/BoardContext';
import Chessboard from '../components/Chessboard';

function ChessGamePage() {
    return (
        <GameProvider>
            <ChatProvider>
                <ChatWindow />
            </ChatProvider>
            <BoardProvider>
                <Chessboard />
            </BoardProvider>
        </GameProvider>
    );
}

export default ChessGamePage;