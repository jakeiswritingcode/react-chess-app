import { createContext, useContext, useState, ReactNode } from 'react';
import { initialPositions } from '../data/initialPositions';
import { MoveUpdate } from '../wsGameUpdates/updates/MoveUpdate';
import { ForfeitUpdate } from '../wsGameUpdates/updates/ForfeitUpdate';
import { ChatUpdate } from '../wsGameUpdates/updates/ChatUpdate';
import { useGameWebSocket } from './WSGameContext';

interface PieceInfo {
    color: string;
    type: string;
}

interface BoardContextType {
    pieces: { [key: string]: PieceInfo | undefined };
    movePiece: (fromPosition: string, toPosition: string, promotion?: 'Queen' | 'Rook' | 'Bishop' | 'Knight') => void;
    forfeitGame: () => void;
    sendChat: (message: string) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardProviderProps {
    children: ReactNode;
}

export const BoardProvider = ({ children }: BoardProviderProps) => {
    const [pieces, setPieces] = useState<{ [key: string]: PieceInfo | undefined }>(initialPositions);
    const { send } = useGameWebSocket();

    const movePiece = (fromPosition: string, toPosition: string, promotion?: 'Queen' | 'Rook' | 'Bishop' | 'Knight') => {
        const moveUpdate: MoveUpdate = {
            type: 'move',
            from: fromPosition,
            to: toPosition,
            ...(promotion && { promotion }),
        };

        send(moveUpdate);
    };

    const forfeitGame = () => {
        const forfeitUpdate: ForfeitUpdate = {
            type: 'forfeit',
        };

        send(forfeitUpdate);
    };

    const sendChat = (message: string) => {
        const chatUpdate: ChatUpdate = {
            type: 'chat',
            message,
        };

        send(chatUpdate);
    };

    return (
        <BoardContext.Provider value={{ pieces, movePiece, forfeitGame, sendChat }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('useBoardContext must be used within a BoardProvider');
    return context;
};
