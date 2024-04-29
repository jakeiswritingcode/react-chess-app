import { createContext, useContext, ReactNode } from 'react';
import { ChatUpdate } from '../gameUpdates/updates/ChatUpdate';
import { useGameContext } from './GameContext';

interface ChatContextType {
    sendChat: (message: string) => void;
}

const ChatContext = createContext<ChatContextType>({
    sendChat: (message: string) => {
        throw new Error("sendChat() was called before being initialized") },
});

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) throw new Error('useChatContext() must be called within a BoardProvider');
    return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { send, gameIsConnected } = useGameContext();

    const sendChat = (message: string) => {
        const chatUpdate: ChatUpdate = {
            type: 'chat',
            message,
        };

        send(chatUpdate);
    };

    return (
        <ChatContext.Provider value={{ sendChat }}>
            {children}
        </ChatContext.Provider>
    );
};
