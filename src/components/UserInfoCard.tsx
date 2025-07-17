import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Crown, LogOut, Star, Settings } from 'lucide-react';
import '../styles/UserInfoCard.css';

const UserInfoCard: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = (): void => {
        logout();
    };

    const getUserGrade = (points: number): { name: string; color: string; icon: React.ReactNode } => {
        if (points >= 1000) return { name: '다이아몬드', color: '#60A5FA', icon: <Crown size={16} /> };
        if (points >= 500) return { name: '골드', color: '#F59E0B', icon: <Star size={16} /> };
        if (points >= 200) return { name: '실버', color: '#6B7280', icon: <Star size={16} /> };
        return { name: '브론즈', color: '#92400E', icon: <Star size={16} /> };
    };

    const grade = user ? getUserGrade(user.points) : { name: '브론즈', color: '#92400E', icon: <Star size={16} /> };

    return (
        <div className="user-info-card">
            <div className="user-header">
                <div className="user-avatar-section">
                    <div className="user-avatar">
                        {user?.avatar || <User size={24} />}
                    </div>
                    <div className="user-details">
                        <h3 className="username">{user?.username}</h3>
                        <div className="user-grade">
                            {grade.icon}
                            <span>{grade.name}</span>
                        </div>
                    </div>
                </div>
                <button className="logout-button" onClick={handleLogout} title="로그아웃">
                    <LogOut size={16} />
                </button>
            </div>

            <div className="points-section">
                <div className="points-display">
                    <span className="points-label">보유 포인트</span>
                    <span className="points-value">{user?.points?.toLocaleString() || '0'}</span>
                </div>
                <div className="action-buttons">
                    <button className="mypage-button" title="마이페이지">
                        <Settings size={14} />
                        마이페이지
                    </button>
                    <button className="upgrade-button">
                        <Crown size={14} />
                        충전하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;