import React, {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ChangeEvent
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
// import { useAuth } from '../contexts/AuthContext';
import { Send, ArrowLeft, Package, X } from 'lucide-react';
import type {TradeData} from '../types';
import '../styles/pages/ChatRoom.css';

const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { chats, messages, sendMessage, createTrade } = useChat();
  // const { user } = useAuth();

  const [newMessage, setNewMessage] = useState<string>('');
  const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
  const [tradeData, setTradeData] = useState<TradeData>({
    offering: '',
    requesting: ''
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatIdNum = chatId ? parseInt(chatId) : 0;
  const currentChat = chats.find(chat => chat.id === chatIdNum);
  const chatMessages = messages[chatIdNum] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(chatIdNum, newMessage);
      setNewMessage('');
    }
  };

  const handleCreateTrade = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (tradeData.offering && tradeData.requesting) {
      createTrade(chatIdNum, tradeData);
      setShowTradeModal(false);
      setTradeData({ offering: '', requesting: '' });
    }
  };

  const handleTradeDataChange =
      (field: keyof TradeData) =>
          (e: ChangeEvent<HTMLInputElement>): void => {
            setTradeData(prev => ({
              ...prev,
              [field]: e.target.value
            }));
          };

  const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentChat) {
    return (
        <div className="chat-room-container">
          <div className="chat-not-found">
            <h2>Chat not found</h2>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="chat-room-container">
        {/* Chat header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <button
                className="back-button"
                onClick={() => navigate('/')}
                aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="chat-user-info">
              <div className="chat-avatar">{currentChat.avatar}</div>
              <div className="chat-details">
                <h3>{currentChat.name}</h3>
                <p className="online-status">Online</p>
              </div>
            </div>
          </div>
          <div className="chat-header-right">
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowTradeModal(true)}
            >
              <Package size={16} />
              Create Trade
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <div className="message-list">
            {chatMessages.map(message => (
                <div
                    key={message.id}
                    className={`message ${
                        message.senderId === 'current' ? 'sent' : 'received'
                    }`}
                >
                  {message.type === 'trade' ? (
                      <div className="trade-proposal">
                        <div className="trade-header">
                          <Package size={16} />
                          <span>Trade Proposal</span>
                        </div>
                        <div className="trade-items">
                          <div className="trade-item">
                            <strong>Offering:</strong> {message.tradeData?.offering}
                          </div>
                          <div className="trade-item">
                            <strong>Requesting:</strong> {message.tradeData?.requesting}
                          </div>
                        </div>
                        <div className="trade-actions">
                          <button className="btn btn-sm btn-primary">Accept</button>
                          <button className="btn btn-sm btn-outline">Decline</button>
                        </div>
                      </div>
                  ) : (
                      <div className="message-content">
                        <p>{message.content}</p>
                        <div className="message-time">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                  )}
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="chat-input">
          <form onSubmit={handleSendMessage} className="message-form">
            <div className="input-container">
              <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="message-input"
              />
              <button
                  type="submit"
                  className="send-button"
                  disabled={!newMessage.trim()}
                  aria-label="Send"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* Trade Modal */}
        {showTradeModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>Create Trade Proposal</h3>
                  <button
                      className="modal-close"
                      onClick={() => setShowTradeModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCreateTrade} className="trade-form">
                  <div className="form-group">
                    <label className="form-label">What are you offering?</label>
                    <input
                        type="text"
                        value={tradeData.offering}
                        onChange={handleTradeDataChange('offering')}
                        className="form-input"
                        placeholder="e.g., Legendary Sword +5"
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">What are you requesting?</label>
                    <input
                        type="text"
                        value={tradeData.requesting}
                        onChange={handleTradeDataChange('requesting')}
                        className="form-input"
                        placeholder="e.g., Magic Shield, 2000 gold"
                        required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setShowTradeModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Send Proposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default ChatRoom;
