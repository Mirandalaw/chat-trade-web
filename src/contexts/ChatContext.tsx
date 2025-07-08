import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {Chat, Message, TradeData, ChatContextType} from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  useEffect(() => {
    // Mock chat data
    const mockChats: Chat[] = [
      {
        id: 1,
        name: 'Alice Smith',
        avatar: 'A',
        lastMessage: 'I have a rare sword to trade!',
        lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
        unreadCount: 2
      },
      {
        id: 2,
        name: 'Bob Johnson',
        avatar: 'B',
        lastMessage: 'How much for the shield?',
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        unreadCount: 0
      },
      {
        id: 3,
        name: 'Carol Davis',
        avatar: 'C',
        lastMessage: 'Trade completed successfully!',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unreadCount: 1
      },
      {
        id: 4,
        name: 'David Wilson',
        avatar: 'D',
        lastMessage: 'Looking for health potions',
        lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
        unreadCount: 0
      }
    ];

    const mockMessages: Record<number, Message[]> = {
      1: [
        {
          id: 1,
          senderId: 1,
          content: 'Hey! I noticed you have a rare sword. Are you interested in trading?',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          type: 'text'
        },
        {
          id: 2,
          senderId: 'current',
          content: 'Yes, I am! What do you have to offer?',
          timestamp: new Date(Date.now() - 12 * 60 * 1000),
          type: 'text'
        },
        {
          id: 3,
          senderId: 1,
          content: 'I have a rare sword to trade!',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          type: 'text'
        }
      ],
      2: [
        {
          id: 4,
          senderId: 2,
          content: 'How much for the shield?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          type: 'text'
        },
        {
          id: 5,
          senderId: 'current',
          content: 'I can sell it for 2600 points, or we can do a trade',
          timestamp: new Date(Date.now() - 25 * 60 * 1000),
          type: 'text'
        }
      ]
    };

    setChats(mockChats);
    setMessages(mockMessages);
  }, []);

  const sendMessage = (chatId: number, content: string): void => {
    const newMessage: Message = {
      id: Date.now(),
      senderId: 'current',
      content,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage]
    }));

    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: content, lastMessageTime: new Date() }
        : chat
    ));
  };

  const createTrade = (chatId: number, tradeData: TradeData): void => {
    const tradeMessage: Message = {
      id: Date.now(),
      senderId: 'current',
      content: `Trade proposal: ${tradeData.offering} for ${tradeData.requesting}`,
      timestamp: new Date(),
      type: 'trade',
      tradeData
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), tradeMessage]
    }));
  };

  const value: ChatContextType = {
    chats,
    activeChat,
    messages,
    setActiveChat,
    sendMessage,
    createTrade
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};