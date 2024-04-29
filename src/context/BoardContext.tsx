import { createContext, useContext, useState, ReactNode } from 'react';
import { initialPositions } from '../data/initialPositions';
import { MoveUpdate, OfferDrawUpdate, ForfeitUpdate, AcceptDrawUpdate } from '../gameUpdates';
import { useGameContext } from './GameContext';

interface PieceInfo {
    color: string,
    type: string,
}

interface MoveEffect {
    sound: string, // "Default" | "Capture" | "Check" | "Checkmate",
    removals: {
        location: string,
    }[],
    additions: {
        location: string,
        info: PieceInfo,
    }[],
    captures: {
        info: PieceInfo,
    }[],
    promotionsAvailable: string[],
}

interface BoardContextType {
    player: 'White' | 'Black',
    turn: 'White' | 'Black',
    pieces: { [key: string]: PieceInfo | undefined },
    // captures: PieceInfo[],
    moves: { [key: string]: MoveEffect | undefined},
    promotionData: { inProgress: boolean, from: string, to: string, promotions: string[]},
    setPromotionData: (data: { inProgress: boolean, from: string, to: string, promotions: string[] }) => void,
    movePiece: (from: string, to: string, promotion?: string) => void,
    offerDraw: () => void,
    acceptDraw: () => void,
    forfeitGame: () => void,
}

const BoardContext = createContext<BoardContextType>({
    player: 'White',
    turn: 'White',
    pieces: {},
    // captures: [],
    moves: {},
    promotionData: {inProgress: false, from: '', to: '', promotions: []},
    setPromotionData: (data: { inProgress: boolean, from: string, to: string, promotions: string[] }) => {
        throw new Error('setPromotionData() was called before being initialized'); },
    movePiece: (from: string, to: string, promotion?: string) => {
        throw new Error('movePiece() was called before being initialized'); },
    offerDraw: () => {
        throw new Error('offerDraw() was called before being initialized'); },
    acceptDraw: () => {
        throw new Error('acceptDraw() was called before being initialized'); },
    forfeitGame: () => {
        throw new Error('forfeitGame() was called before being initialized'); },
});

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('useBoardContext() must be called within a BoardProvider');
    return context;
};

export const BoardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { send, gameIsConnected } = useGameContext();

    const [player, setPlayer] = useState<'White' | 'Black'>('White')
    const [turn, setTurn] = useState<'White' | 'Black'>('White')
    const [pieces, setPieces] = useState<{ [key: string]: PieceInfo | undefined }>(initialPositions);
    // const [captures, setCaptures] = useState<PieceInfo[]>([])
    const [moves, setMoves] = useState<{ [key: string]: MoveEffect | undefined }>({});
    const [promotionData, setPromotionData] = useState({
        inProgress: false,
        from: '',
        to: '',
        promotions: [] as string[]
    });

    const movePiece = (from: string, to: string, promotion?: string) => {
        if (!gameIsConnected) {
            console.error("No connection established."); // TODO: notify user
            return;
        }

        const newPieces = pieces;
        const selectedMove = moves[`${from}_${to}`];
        if (!selectedMove) {
            console.error("The requested move is invalid.")
            return;
        }
        selectedMove.removals.forEach((removal) => { newPieces[removal.location] = undefined; });
        selectedMove.additions.forEach((addition) => { newPieces[addition.location] = addition.info; });
        // selectedMove.captures.forEach((capture) => { captures.push(capture.info) });
        setPieces(newPieces);

        // TODO: play sound based on selectedMoveEffect.sound.

        const promotions = selectedMove.promotionsAvailable;
        if (!promotion && promotions.length !== 0) {
            setPromotionData({ inProgress: true, from, to, promotions });
            return;
        } else if (promotion) {
            newPieces[to] = { color: turn, type: promotion };
            setPieces(newPieces);
        }

        if (turn === 'White') setTurn('Black');
        else setTurn('White');

        const moveUpdate: MoveUpdate = {
            type: 'move',
            from,
            to,
            ...(promotion ? { promotion } : {}),
        };

        send(moveUpdate);
    };

    const offerDraw = () => {
        const offerDrawUpdate: OfferDrawUpdate = {
            type: 'offerDraw',
        };
        send(offerDrawUpdate);
    }

    const acceptDraw = () => {
        const acceptDrawUpdate: AcceptDrawUpdate = {
            type: 'acceptDraw',
        };
        send(acceptDrawUpdate);
    }

    const forfeitGame = () => {
        const forfeitUpdate: ForfeitUpdate = {
            type: 'forfeit',
        };
        send(forfeitUpdate);
    };

    return (
        <BoardContext.Provider value={{ pieces, movePiece, forfeitGame, sendChat }}>
            {children}
        </BoardContext.Provider>
    );
};
