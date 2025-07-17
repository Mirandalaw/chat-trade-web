import React, { useState } from 'react';
import { MessageCircle, X, Clock, User } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ChatManagementButton.css';

const ChatManagementButton: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const { chats } = useChat();
    const navigate = useNavigate();

    const toggleDrawer = (): void => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleChatClick = (chatId: number): void => {
        navigate(`/chat/${chatId}`);
        setIsDrawerOpen(false);
    };

    const formatLastMessageTime = (timestamp: Date): string => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (minutes < 1) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        return timestamp.toLocaleDateString();
    };

    const totalUnreadCount = chats.reduce((sum, chat) => sum + chat.unreadCount, 0);

    return (
        <>
            <div className="chat-management-button">
                <button
                    className="floating-button"
                    onClick={toggleDrawer}
                    title="1:1 채팅 관리"
                >
                    <MessageCircle size={24} />
                    {totalUnreadCount > 0 && (
                        <div className="unread-badge">{totalUnreadCount}</div>
                    )}
                </button>
            </div>

            {isDrawerOpen && (
                <>
                    <div className="drawer-overlay" onClick={toggleDrawer} />
                    <div className="chat-drawer">
                        <div className="drawer-header">
                            <h3>1:1 채팅 관리</h3>
                            <button className="close-button" onClick={toggleDrawer}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="drawer-content">
                            {chats.length === 0 ? (
                                <div className="empty-state">
                                    <MessageCircle size={48} />
                                    <p>진행 중인 채팅이 없습니다</p>
                                </div>
                            ) : (
                                <div className="chat-list">
                                    {chats.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className="chat-item"
                                            onClick={() => handleChatClick(chat.id)}
                                        >
                                            <div className="chat-avatar">
                                                {chat.avatar}
                                            </div>
                                            <div className="chat-info">
                                                <div className="chat-header-info">
                                                    <span className="chat-name">{chat.name}</span>
                                                    <span className="chat-time">
                            {formatLastMessageTime(chat.lastMessageTime)}
                          </span>
                                                </div>
                                                <div className="chat-last-message">
                                                    {chat.lastMessage}
                                                </div>
                                            </div>
                                            {chat.unreadCount > 0 && (
                                                <div className="chat-unread-badge">
                                                    {chat.unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ChatManagementButton;