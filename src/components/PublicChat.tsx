import React, { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { Send, Users, Search, Filter, X } from 'lucide-react';
import '../styles/PublicChat.css'
interface PublicMessage {
    id: number;
    username: string;
    avatar: string;
    content: string;
    timestamp: Date;
    isCurrentUser: boolean;
    type: 'general' | 'trade' | 'question' | 'announcement';
}

type FilterType = 'all' | 'general' | 'trade' | 'question' | 'announcement';

const PublicChat: React.FC = () => {
    const [allMessages] = useState<PublicMessage[]>([
        {
            id: 1,
            username: 'Alice',
            avatar: 'A',
            content: 'Anyone selling rare swords? Looking for +10 or higher!',
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            isCurrentUser: false,
            type: 'trade'
        },
        {
            id: 2,
            username: 'Bob',
            avatar: 'B',
            content: 'I have a +12 Fire Sword, DM me for price',
            timestamp: new Date(Date.now() - 12 * 60 * 1000),
            isCurrentUser: false,
            type: 'trade'
        },
        {
            id: 3,
            username: 'You',
            avatar: 'Y',
            content: 'What about shields? Any good deals today?',
            timestamp: new Date(Date.now() - 8 * 60 * 1000),
            isCurrentUser: true,
            type: 'question'
        },
        {
            id: 4,
            username: 'Carol',
            avatar: 'C',
            content: 'Check out my shop! Best prices on potions and armor',
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            isCurrentUser: false,
            type: 'trade'
        },
        {
            id: 5,
            username: 'David',
            avatar: 'D',
            content: 'Trading event starts in 1 hour! Don\'t miss out 🔥',
            timestamp: new Date(Date.now() - 2 * 60 * 1000),
            isCurrentUser: false,
            type: 'announcement'
        },
        {
            id: 6,
            username: 'Emma',
            avatar: 'E',
            content: 'Hello everyone! New to trading, any tips?',
            timestamp: new Date(Date.now() - 1 * 60 * 1000),
            isCurrentUser: false,
            type: 'question'
        },
        {
            id: 7,
            username: 'Frank',
            avatar: 'F',
            content: 'Great community here! Love the trading system',
            timestamp: new Date(Date.now() - 30 * 1000),
            isCurrentUser: false,
            type: 'general'
        }
    ]);

    const [filteredMessages, setFilteredMessages] = useState<PublicMessage[]>(allMessages);
    const [newMessage, setNewMessage] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [onlineCount] = useState<number>(247);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [filteredMessages]);

    useEffect(() => {
        filterMessages();
    }, [searchQuery, selectedFilter, allMessages]);

    const scrollToBottom = (): void => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const filterMessages = (): void => {
        let filtered = allMessages;

        // Apply type filter
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(message => message.type === selectedFilter);
        }

        // Apply search filter
        if (searchQuery.trim()) {
            filtered = filtered.filter(message =>
                message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                message.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredMessages(filtered);
    };

    const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (newMessage.trim()) {
            const message: PublicMessage = {
                id: Date.now(),
                username: 'You',
                avatar: 'Y',
                content: newMessage,
                timestamp: new Date(),
                isCurrentUser: true,
                type: 'general'
            };

            // In a real app, this would be sent to the server
            // For now, we'll just add it to the current filtered view if it matches
            const updatedMessages = [...allMessages, message];

            // Update filtered messages based on current filters
            let newFiltered = updatedMessages;
            if (selectedFilter !== 'all') {
                newFiltered = newFiltered.filter(msg => msg.type === selectedFilter);
            }
            if (searchQuery.trim()) {
                newFiltered = newFiltered.filter(msg =>
                    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    msg.username.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            setFilteredMessages(newFiltered);
            setNewMessage('');
        }
    };

    const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewMessage(e.target.value);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (filter: FilterType): void => {
        setSelectedFilter(filter);
        setIsFilterOpen(false);
    };

    const clearSearch = (): void => {
        setSearchQuery('');
    };

    const formatTime = (timestamp: Date): string => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFilterLabel = (filter: FilterType): string => {
        const labels = {
            all: '전체',
            general: '일반',
            trade: '거래',
            question: '질문',
            announcement: '공지'
        };
        return labels[filter];
    };

    const getMessageTypeColor = (type: string): string => {
        const colors = {
            general: 'var(--gray-500)',
            trade: 'var(--accent-teal)',
            question: 'var(--accent-orange)',
            announcement: 'var(--accent-red)'
        };
        return colors[type as keyof typeof colors] || 'var(--gray-500)';
    };

    return (
        <div className="public-chat">
            <div className="public-chat-header">
                <div className="chat-title">
                    <Users size={24} />
                    <h2>공개 채팅</h2>
                </div>
                <div className="online-indicator">
                    <div className="online-dot"></div>
                    <span>{onlineCount}명 접속중</span>
                </div>
            </div>

            <div className="chat-controls">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <Search size={16} className="search-icon" />
                        <input
                            type="text"
                            placeholder="메시지 또는 사용자 검색..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button className="clear-search" onClick={clearSearch}>
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="filter-container">
                    <button
                        className={`filter-button ${isFilterOpen ? 'active' : ''}`}
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                        <Filter size={16} />
                        <span>{getFilterLabel(selectedFilter)}</span>
                    </button>

                    {isFilterOpen && (
                        <div className="filter-dropdown">
                            <button
                                className={`filter-option ${selectedFilter === 'all' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('all')}
                            >
                                전체
                            </button>
                            <button
                                className={`filter-option ${selectedFilter === 'general' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('general')}
                            >
                                일반
                            </button>
                            <button
                                className={`filter-option ${selectedFilter === 'trade' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('trade')}
                            >
                                거래
                            </button>
                            <button
                                className={`filter-option ${selectedFilter === 'question' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('question')}
                            >
                                질문
                            </button>
                            <button
                                className={`filter-option ${selectedFilter === 'announcement' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange('announcement')}
                            >
                                공지
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="public-chat-messages">
                <div className="message-list">
                    {filteredMessages.length === 0 ? (
                        <div className="no-messages">
                            <Search size={48} />
                            <p>검색 결과가 없습니다</p>
                            <span>다른 키워드로 검색해보세요</span>
                        </div>
                    ) : (
                        filteredMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`public-message ${message.isCurrentUser ? 'sent' : 'received'}`}
                            >
                                {!message.isCurrentUser && (
                                    <div className="message-avatar">
                                        {message.avatar}
                                    </div>
                                )}
                                <div className="message-content">
                                    {!message.isCurrentUser && (
                                        <div className="message-header">
                                            <span className="message-username">{message.username}</span>
                                            <span
                                                className="message-type-badge"
                                                style={{ backgroundColor: getMessageTypeColor(message.type) }}
                                            >
                        {getFilterLabel(message.type)}
                      </span>
                                        </div>
                                    )}
                                    <div className="message-bubble">
                                        <p>{message.content}</p>
                                        <div className="message-time">
                                            {formatTime(message.timestamp)}
                                        </div>
                                    </div>
                                </div>
                                {message.isCurrentUser && (
                                    <div className="message-avatar current-user">
                                        {message.avatar}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="public-chat-input">
                <form onSubmit={handleSendMessage} className="message-form">
                    <div className="input-container">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={handleMessageChange}
                            placeholder="공개 채팅에 메시지를 입력하세요..."
                            className="message-input"
                            maxLength={200}
                        />
                        <button type="submit" className="send-button" disabled={!newMessage.trim()}>
                            <Send size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PublicChat;