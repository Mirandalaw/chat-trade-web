import React from 'react';
import { useChat} from "../contexts/ChatContext.tsx";
import { MessageCircle, Users, TrendingUp } from 'lucide-react';
import '../styles/ChatPreviewBox.css';

const ChatPreviewBox: React.FC = () => {
  const { chats } = useChat();

  const totalUnread = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);
  const activeChats = chats.filter(chat => chat.unreadCount > 0).length;

  return (
      <div className="chat-preview-box">
        <div className="chat-overview-header">
          <h2>Chat Overview</h2>
          <div className="chat-stats">
            <div className="stat">
              <MessageCircle size={20} />
              <span>300 points</span>
            </div>
          </div>
        </div>

        <div className="chat-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-info">
              <h4>Active Chats</h4>
              <p>{activeChats}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <MessageCircle size={24} />
            </div>
            <div className="metric-info">
              <h4>Unread Messages</h4>
              <p>{totalUnread}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">
              <TrendingUp size={24} />
            </div>
            <div className="metric-info">
              <h4>Trades Today</h4>
              <p>7</p>
            </div>
          </div>
        </div>

        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-avatar">A</div>
              <div className="activity-content">
                <p><strong>Alice Smith</strong> sent a trade proposal</p>
                <span className="activity-time">5 minutes ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-avatar">B</div>
              <div className="activity-content">
                <p><strong>Bob Johnson</strong> accepted your offer</p>
                <span className="activity-time">12 minutes ago</span>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-avatar">C</div>
              <div className="activity-content">
                <p><strong>Carol Davis</strong> is typing...</p>
                <span className="activity-time">now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <button className="btn btn-primary">
            <MessageCircle size={16} />
            New Chat
          </button>
          <button className="btn btn-secondary">
            <TrendingUp size={16} />
            Create Trade
          </button>
        </div>
      </div>
  );
};

export default ChatPreviewBox;