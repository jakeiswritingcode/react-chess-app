import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GameUpdate } from '../gameUpdates';

interface GameContextType {
  send: (message: GameUpdate) => void;
  gameIsConnected: boolean;
}

const GameContext = createContext<GameContextType>({
  send: () => { console.error("webSocketService context is undefined. Message cannot be sent.") },
  gameIsConnected: false,
});

export const useGameContext = () => useContext(GameContext);

interface WebSocketProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: WebSocketProviderProps) => {
  const [webSocketService, setWebSocketService] = useState<WebSocketService>();
  const [gameIsConnected, setGameIsConnected] = useState(false);

  useEffect(() => {
    const service = new WebSocketService('wss://chess-backend-url.com', handleMessage); // TODO: generate backend url
    service.connect()
      .then(() => {
        setWebSocketService(service);
        setGameIsConnected(true)
      })
      .catch((error) => {
        console.error("Failed to connect:", error);
        setGameIsConnected(false);
      });

    return () => {
      service.disconnect();
      setGameIsConnected(false);
    };
  }, []);

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

  const send = (gameUpdate: GameUpdate) => {
    if (!webSocketService) {
      console.error("webSocketService state is undefined.");
      return;
    }
    webSocketService.send(
      JSON.stringify(gameUpdate)
    );
  };

  return (
    <GameContext.Provider value={{ send, gameIsConnected, boardData, chatData }}>
      {children}
    </GameContext.Provider>
  );
};
