import './Tile.css';

interface TileProps {
    file: string
    rank: string
    children?: React.ReactNode;
}

export default function Tile({file, rank, children}: TileProps) {
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankIndex = rank.charCodeAt(0) - '1'.charCodeAt(0);
    const tileClass = (fileIndex + rankIndex) % 2 !== 0 ? "white-tile" : "black-tile";

    return <div id={file+rank} className={tileClass}>{children}</div>;
}
