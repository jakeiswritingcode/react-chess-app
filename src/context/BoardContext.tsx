import { createContext, useContext, useState, ReactNode } from 'react';
import initialPositions from '../data/initialPositions';

interface BoardContextType {
    pieces: { [key: string]: any }; // Replace 'any' with your piece type
    movePiece: (fromPosition: string, toPosition: string) => void;
}

// Create the context with an undefined initial value, but assert the type.
const BoardContext = createContext<BoardContextType | undefined>(undefined);

// Create a provider component
interface BoardProviderProps {
    children: ReactNode;
}

export const BoardProvider = ({ children }: BoardProviderProps) => {
    const [pieces, setPiece] = useState<{ [key: string]: any }>(initialPositions);
  
    const movePiece = (fromPosition: string, toPosition: string) => {
        setPiece((prevPieces) => {
            // if the move is valid, apply move to backend
            // use backend getter to update piece list
            const updatedPieces = { ...prevPieces };
            updatedPieces[toPosition] = updatedPieces[fromPosition];
            delete updatedPieces[fromPosition];
            return updatedPieces;
        });
    };

    return (
        <BoardContext.Provider value={{ pieces, movePiece }}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (context === undefined) throw new Error('useBoardContext must be used within a BoardProvider');
    return context;
};
