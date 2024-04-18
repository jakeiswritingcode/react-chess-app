import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameUpdate } from '../wsGameUpdates';

interface WSGameContextType {
  send: (message: GameUpdate) => void;
}

const defaultContextValue: WSGameContextType = {
  send: (message: GameUpdate) => {},
};

const WebSocketContext = createContext<WSGameContextType>(defaultContextValue);

export const useGameWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WSGameProvider = ({ children }: WebSocketProviderProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  // set gameState context
  // set chat context

  const send = (gameUpdate: GameUpdate) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(gameUpdate));
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  useEffect(() => {
    let webSocket: WebSocket | null;
    let retryConnectionTimeoutId: NodeJS.Timeout;

    const initializeWebSocket = () => {
      webSocket = new WebSocket('wss://chess-backend-url.com'); // TODO: generate backend url
      webSocket.onopen = handleOpen;
      webSocket.onclose = handleClose;
      webSocket.onerror = handleError;
      webSocket.onmessage = handleMessage;
    };

    const handleOpen = () => {
      setWs(webSocket);
      console.log('WebSocket Connected');
      clearTimeout(retryConnectionTimeoutId);
    };
  
    const handleClose = (event: CloseEvent) => {
      setWs(null);
      console.log('WebSocket Disconnected', event.reason);
      if (!event.wasClean) {
        retryConnectionTimeoutId = setTimeout(initializeWebSocket, 4000);
      }
    };

    const handleError = (error: Event) => {
      webSocket?.close();
      console.error('WebSocket Error:', error);
    };

    const handleMessage = (event: MessageEvent) => {
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

    initializeWebSocket();

    return () => {
      webSocket?.close();
      clearTimeout(retryConnectionTimeoutId);
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ send }}>
      {children}
    </WebSocketContext.Provider>
  );
};