import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameUpdate } from '../wsGameUpdates';

interface WSGameContextType {
  ws: WebSocket | null;
  send: (message: GameUpdate) => void;
}

const defaultContextValue: WSGameContextType = {
  ws: null,
  send: (message: GameUpdate) => {},
};

const WebSocketContext = createContext<WSGameContextType>(defaultContextValue);

export const useGameWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WSGameProvider = ({ children }: WebSocketProviderProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);

  const send = (gameUpdate: GameUpdate) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(gameUpdate));
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  useEffect(() => {
    const webSocket = new WebSocket('wss://chess-backend-url.com'); // TODO: generate backend url

    webSocket.onopen = () => {
      setWs(webSocket);
      console.log('WebSocket Connected');
    };

    webSocket.onclose = () => {
      setWs(null);
      console.log('WebSocket Disconnected');
    };

    webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case 'full-update':
          // update board context value
          // update chatbox context value
          break;
        case 'move-update':
          // update board context value
          break;
        case 'chat-update':
          // add to chatbox context value here
          break;
        default:
          console.error(`Unsupported message type received: ${message.type}`);
          // TODO: implement UI feedback and/or fallback behavior
      }
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, send }}>
      {children}
    </WebSocketContext.Provider>
  );
};