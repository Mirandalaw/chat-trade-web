import React, {
  useState,
  useRef,
  useEffect,
  type FormEvent,
  type ChangeEvent
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '../contexts/ChatContext';
import { Send, ArrowLeft, Package, X } from 'lucide-react';
import type { TradeData } from '../types';
import '../styles/pages/ChatRoom.css';

const ChatRoom: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const { chats, messages, sendMessage, createTrade } = useChat();

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

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(chatIdNum, newMessage);
      setNewMessage('');
    }
  };

  const handleCreateTrade = (e: FormEvent<HTMLFormElement>) => {
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
            <h2>채팅방을 찾을 수 없습니다</h2>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="chat-room-container">
        {/* 헤더 */}
        <div className="chat-header">
          <div className="chat-header-left">
            <button
                className="back-button"
                onClick={() => navigate('/')}
                aria-label="뒤로가기"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="chat-user-info">
              <div className="chat-avatar">{currentChat.avatar}</div>
              <div className="chat-details">
                <h3>{currentChat.name}</h3>
                <p className="online-status">온라인</p>
              </div>
            </div>
          </div>
          <div className="chat-header-right">
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowTradeModal(true)}
            >
              <Package size={16} />
              거래 제안
            </button>
          </div>
        </div>

        {/* 메시지 리스트 */}
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
                          <span>거래 제안</span>
                        </div>
                        <div className="trade-items">
                          <div className="trade-item">
                            <strong>제공:</strong> {message.tradeData?.offering}
                          </div>
                          <div className="trade-item">
                            <strong>요청:</strong> {message.tradeData?.requesting}
                          </div>
                        </div>
                        <div className="trade-actions">
                          <button className="btn btn-sm btn-primary">수락</button>
                          <button className="btn btn-sm btn-outline">거절</button>
                        </div>
                      </div>
                  ) : (
                      <div className="message-content">
                        <p>{message.content}</p>
                        <div className="message-time">{formatTime(message.timestamp)}</div>
                      </div>
                  )}
                </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 입력창 */}
        <div className="chat-input">
          <form onSubmit={handleSendMessage} className="message-form">
            <div className="input-container">
              <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  className="message-input"
              />
              <button
                  type="submit"
                  className="send-button"
                  disabled={!newMessage.trim()}
                  aria-label="전송"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* 거래 모달 */}
        {showTradeModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>거래 제안 만들기</h3>
                  <button
                      className="modal-close"
                      onClick={() => setShowTradeModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleCreateTrade} className="trade-form">
                  <div className="form-group">
                    <label className="form-label">제공할 아이템</label>
                    <input
                        type="text"
                        value={tradeData.offering}
                        onChange={handleTradeDataChange('offering')}
                        className="form-input"
                        placeholder="예: 전설의 검 +5"
                        required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">요청할 아이템</label>
                    <input
                        type="text"
                        value={tradeData.requesting}
                        onChange={handleTradeDataChange('requesting')}
                        className="form-input"
                        placeholder="예: 마법 방패, 2000골드"
                        required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => setShowTradeModal(false)}
                    >
                      취소
                    </button>
                    <button type="submit" className="btn btn-primary">
                      제안 보내기
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
