import './App.css';
import Chessboard from './components/Chessboard';
import { BoardProvider } from './context/BoardContext';

function App() {
  return (
    <div id="app">
      <BoardProvider>
        <Chessboard/>
      </BoardProvider>
    </div>
  );
}

export default App;
