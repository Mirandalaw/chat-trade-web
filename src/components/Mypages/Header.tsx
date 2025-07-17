import React, { useState, useRef, useEffect } from 'react';
import { Settings, Bell, LogOut, User, Shield } from 'lucide-react';
import '../../styles/pages/Mypages/Header.css';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'transaction' | 'system' | 'promotion';
}

const Header: React.FC = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: '거래 완료',
            message: '김철수님과의 아이폰 14 Pro 거래가 완료되었습니다.',
            time: '5분 전',
            read: false,
            type: 'transaction'
        },
        {
            id: '2',
            title: '포인트 충전 완료',
            message: '50,000P가 충전되었습니다.',
            time: '1시간 전',
            read: false,
            type: 'system'
        },
        {
            id: '3',
            title: '등급 승급 안내',
            message: '골드 등급까지 거래 3회 남았습니다!',
            time: '2시간 전',
            read: true,
            type: 'promotion'
        },
        {
            id: '4',
            title: '새로운 매칭',
            message: '맥북 에어 거래 요청이 도착했습니다.',
            time: '3시간 전',
            read: true,
            type: 'transaction'
        }
    ]);

    const notificationRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'transaction':
                return '💰';
            case 'system':
                return '⚙️';
            case 'promotion':
                return '🎉';
            default:
                return '📢';
        }
    };

    const handleLogout = () => {
        // 로그아웃 로직 구현
        console.log('로그아웃');
        setIsUserMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-title">
                    <h1>
                        마이페이지
                    </h1>
                    <p className="header-subtitle">계정 정보와 활동 내역을 관리하세요</p>
                </div>

                <div className="header-actions">
                    {/* 알림 버튼 */}
                    <div className="notification-menu" ref={notificationRef}>
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="notification-button"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="notification-badge">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
                            )}
                        </button>

                        {/* 알림 드롭다운 */}
                        {isNotificationOpen && (
                            <div className="notification-dropdown">
                                <div className="notification-header">
                                    <h3>알림</h3>
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="mark-all-read"
                                        >
                                            모두 읽음
                                        </button>
                                    )}
                                </div>

                                <div className="notification-list">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                onClick={() => markAsRead(notification.id)}
                                                className={`notification-item ${
                                                    !notification.read ? 'unread' : ''
                                                }`}
                                            >
                                                <div className="notification-content">
                          <span className="notification-icon">
                            {getNotificationIcon(notification.type)}
                          </span>
                                                    <div className="notification-text">
                                                        <div className="notification-title">
                                                            <h4>
                                                                {notification.title}
                                                            </h4>
                                                            {!notification.read && (
                                                                <div className="unread-dot"></div>
                                                            )}
                                                        </div>
                                                        <p className="notification-message">
                                                            {notification.message}
                                                        </p>
                                                        <span className="notification-time">
                              {notification.time}
                            </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="notification-empty">
                                            <Bell className="notification-empty-icon" />
                                            <p>새로운 알림이 없습니다</p>
                                        </div>
                                    )}
                                </div>

                                <div className="notification-footer">
                                    <button className="view-all-notifications">
                                        모든 알림 보기
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 설정 버튼 */}
                    <button className="settings-button">
                        <Settings size={20} />
                    </button>

                    {/* 사용자 메뉴 */}
                    <div className="user-menu" ref={userMenuRef}>
                        <button
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="user-avatar"
                        >
                            굿
                        </button>

                        {/* 사용자 드롭다운 메뉴 */}
                        {isUserMenuOpen && (
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <div className="user-info-avatar">
                                        굿
                                    </div>
                                    <div className="user-info-text">
                                        <p className="user-info-name">굿즈러버</p>
                                        <p className="user-info-grade">실버 등급</p>
                                    </div>
                                </div>

                                <div className="user-menu-items">
                                    <button className="user-menu-item">
                                        <User size={16} />
                                        <span>프로필 설정</span>
                                    </button>
                                    <button className="user-menu-item">
                                        <Shield size={16} />
                                        <span>보안 설정</span>
                                    </button>
                                </div>

                                <div className="user-menu-logout">
                                    <button
                                        onClick={handleLogout}
                                        className="logout-button"
                                    >
                                        <LogOut size={16} />
                                        <span>로그아웃</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;