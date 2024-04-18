import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChessGamePage from './pages/ChessGamePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFountPage'

function App() {
  return (
    <BrowserRouter>
      <div id="app">
        <Routes>
          <Route path="/" element={<ChessGamePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
