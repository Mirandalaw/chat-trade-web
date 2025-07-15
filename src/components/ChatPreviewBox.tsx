import React from 'react';
import { useChat } from "../contexts/ChatContext.tsx";
import { MessageCircle, Users, TrendingUp } from 'lucide-react';
import '../styles/ChatPreviewBox.css';
import {useNavigate} from "react-router-dom";

const ChatPreviewBox: React.FC = () => {
  const { chats } = useChat();
  const navigate = useNavigate();
  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  const activeChats = chats.filter(chat => chat.unreadCount > 0).length;

  const hadleGoToChat = (chatId: number) =>{
    navigate(`/chat/${chatId}`);
  }

  return (
      <div className="chat-preview-box">
        {/* 상단 요약 */}
        <div className="chat-overview-header">
          <h2>채팅 개요</h2>
          <div className="chat-stats">
            <div className="stat">
              <MessageCircle size={20} />
              <span>포인트: 300</span>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="chat-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <h4>활성 채팅</h4>
              <p>{activeChats}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <MessageCircle size={24} />
            </div>
            <div className="metric-info">
              <h4>읽지 않은 메시지</h4>
              <p>{totalUnread}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <TrendingUp size={24} />
            </div>
            <div className="metric-info">
              <h4>오늘의 거래 수</h4>
              <p>7</p>
            </div>
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="recent-activity">
          <h3>최근 활동</h3>
          <div className="activity-list">
            <div className="activity-item" onClick={() =>hadleGoToChat(1)} style={{ cursor: 'pointer' }}>
              <div className="activity-avatar">A</div>
              <div className="activity-content">
                <p><strong>Alice Smith</strong> 님이 거래 제안을 보냈습니다</p>
                <span className="activity-time">5분 전</span>
              </div>
            </div>

            <div className="activity-item" onClick={() =>hadleGoToChat(2)} style={{ cursor: 'pointer' }}>
              <div className="activity-avatar">B</div>
              <div className="activity-content">
                <p><strong>Bob Johnson</strong> 님이 제안을 수락했습니다</p>
                <span className="activity-time">12분 전</span>
              </div>
            </div>

            <div className="activity-item" onClick={() =>hadleGoToChat(3)} style={{ cursor: 'pointer' }}>
              <div className="activity-avatar">C</div>
              <div className="activity-content">
                <p><strong>Carol Davis</strong> 님이 입력 중...</p>
                <span className="activity-time">방금 전</span>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 동작 */}
        <div className="quick-actions">
          <button className="btn btn-primary">
            <MessageCircle size={16} />
            새 채팅 시작
          </button>
          <button className="btn btn-secondary">
            <TrendingUp size={16} />
            거래 생성
          </button>
        </div>
      </div>
  );
};

export default ChatPreviewBox;
