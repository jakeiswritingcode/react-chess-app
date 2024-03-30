import React from 'react';

import './Chessboard.css';

//const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const verticalAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Chessboard() {
    let board = [];

    for (let i = 0; i < verticalAxis.length; i++) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            if ((i + j) % 2 === 0) {
                board.push(<div className = "white-tile">{horizontalAxis[j]}{verticalAxis[i]} </div>);
            }
            else {
                board.push(<div className = "black-tile">{horizontalAxis[j]}{verticalAxis[i]} </div>);
            }
        }
    }

    return <div id = "chessboard">{board}</div>;
}
