interface PieceInfo {
    type: string;
    color: string;
}

export const initialPositions: {
    [key: string]: PieceInfo | undefined
} = {
    "a1": { color: "White", type: "Rook" },
    "b1": { color: "White", type: "Knight" },
    "c1": { color: "White", type: "Bishop" },
    "d1": { color: "White", type: "Queen" },
    "e1": { color: "White", type: "King" },
    "f1": { color: "White", type: "Bishop" },
    "g1": { color: "White", type: "Knight" },
    "h1": { color: "White", type: "Rook" },

    "a2": { color: "White", type: "Pawn" },
    "b2": { color: "White", type: "Pawn" },
    "c2": { color: "White", type: "Pawn" },
    "d2": { color: "White", type: "Pawn" },
    "e2": { color: "White", type: "Pawn" },
    "f2": { color: "White", type: "Pawn" },
    "g2": { color: "White", type: "Pawn" },
    "h2": { color: "White", type: "Pawn" },

    "a7": { color: "Black", type: "Pawn" },
    "b7": { color: "Black", type: "Pawn" },
    "c7": { color: "Black", type: "Pawn" },
    "d7": { color: "Black", type: "Pawn" },
    "e7": { color: "Black", type: "Pawn" },
    "f7": { color: "Black", type: "Pawn" },
    "g7": { color: "Black", type: "Pawn" },
    "h7": { color: "Black", type: "Pawn" },

    "a8": { color: "Black", type: "Rook" },
    "b8": { color: "Black", type: "Knight" },
    "c8": { color: "Black", type: "Bishop" },
    "d8": { color: "Black", type: "Queen" },
    "e8": { color: "Black", type: "King" },
    "f8": { color: "Black", type: "Bishop" },
    "g8": { color: "Black", type: "Knight" },
    "h8": { color: "Black", type: "Rook" },
};
