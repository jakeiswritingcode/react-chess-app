import './App.css';
import Chessboard from './components/Chessboard';
import { WebSocketProvider } from './context/WSGameContext';
import { BoardProvider } from './context/BoardContext';

function App() {
  return (
    <div id="app">
      <WebSocketProvider>
        <BoardProvider>
          <Chessboard/>
        </BoardProvider>
      </WebSocketProvider>
    </div>
  );
}

export default App;
