import React from 'react';
import { useAuth } from "../contexts/AuthContext.tsx";
import { useChat } from "../contexts/ChatContext.tsx";
import { User, MessageCircle, LogOut, Crown } from 'lucide-react';
import type { ItemPrice } from "../types";
import '../styles/variables.css'
import '../styles/SidebarRight.css';

const SidebarRight: React.FC = () => {
    const { user, logout } = useAuth();
    const { chats } = useChat();

    const itemPrices: ItemPrice[] = [
        { name: '소드', price: 5200, trend: 'up' },
        { name: '방패', price: 2600, trend: 'down' },
        { name: '포션', price: 5200, trend: 'up' },
        { name: '활', price: 3400, trend: 'up' },
        { name: '갑옷', price: 7800, trend: 'down' }
    ];

    const handleLogout = (): void => {
        logout();
    };

    return (
        <div className="sidebar-right">
            {/* 유저 카드 */}
            <div className="card user-card">
                <div className="card-body">
                    <div className="user-info">
                        <div className="user-avatar">
                            <div className="avatar-circle">
                                {user?.avatar || <User size={20} />}
                            </div>
                            <div className="user-details">
                                <h4 className="user-name">{user?.username}</h4>
                                <p className="user-points">{user?.points} 포인트</p>
                            </div>
                        </div>
                        <div className="user-actions">
                            <button className="btn btn-sm btn-outline">
                                <Crown size={14} />
                                업그레이드
                            </button>
                            <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
                                <LogOut size={14} />
                                로그아웃
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 실시간 아이템 가격 */}
            <div className="card price-card">
                <div className="card-header">
                    <h4>실시간 아이템 시세</h4>
                </div>
                <div className="card-body">
                    <div className="price-list">
                        {itemPrices.map((item, index) => (
                            <div key={index} className="price-item">
                                <span className="price-name">{item.name}</span>
                                <div className="price-info">
                                    <span className="price-value">{item.price.toLocaleString()}G</span>
                                    <span className={`price-trend ${item.trend}`}>
                    {item.trend === 'up' ? '↗' : '↘'}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 최근 채팅 */}
            <div className="card chat-preview-card">
                <div className="card-header">
                    <h4>최근 채팅</h4>
                </div>
                <div className="card-body">
                    <div className="chat-preview-list">
                        {chats.slice(0, 3).map(chat => (
                            <div key={chat.id} className="chat-preview-item">
                                <div className="chat-avatar">{chat.avatar}</div>
                                <div className="chat-info">
                                    <div className="chat-name">{chat.name}</div>
                                    <div className="chat-last-message">{chat.lastMessage}</div>
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="unread-badge">{chat.unreadCount}</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-sm btn-primary w-full mt-4">
                        <MessageCircle size={14} />
                        전체 채팅 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarRight;
