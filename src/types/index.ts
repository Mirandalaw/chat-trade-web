export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  points: number;
  joinDate: string;
}

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Message {
  id: number;
  senderId: number | 'current';
  content: string;
  timestamp: Date;
  type: 'text' | 'trade';
  tradeData?: TradeData;
}

export interface TradeData {
  offering: string;
  requesting: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}


export interface ChatContextType {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Record<number, Message[]>;
  setActiveChat: (chat: Chat | null) => void;
  sendMessage: (chatId: number, content: string) => void;
  createTrade: (chatId: number, tradeData: TradeData) => void;
}

export interface ItemPrice {
  name: string;
  price: number;
  trend: 'up' | 'down';
}