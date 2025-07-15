import React from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';
import '../styles/variables.css';
import '../styles/SidebarLeft.css';

const SidebarLeft: React.FC = () => {
    return (
        <div className="sidebar-left">
            {/* 광고 블록 1 */}
            <div className="ad-block">
                <TrendingUp size={32} className="ad-icon" />
                <h3 className="ad-title">거래 속도 향상하기</h3>
                <p className="ad-description">
                    프리미엄 회원은 2배 빠른 거래와 우선 지원을 받을 수 있어요.
                </p>
                <button className="btn btn-sm mt-4 translucent-button">
                    자세히 보기
                </button>
            </div>

            {/* 광고 블록 2 */}
            <div
                className="ad-block"
                style={{
                    background: 'linear-gradient(135deg, var(--accent-red), var(--accent-orange))',
                }}
            >
                <Users size={32} className="ad-icon" />
                <h3 className="ad-title">엘리트 거래자들과 연결</h3>
                <p className="ad-description">
                    상위 거래자들과 소통하고 희귀 아이템을 독점 입수하세요.
                </p>
                <button className="btn btn-sm mt-4 translucent-button">
                    지금 가입하기
                </button>
            </div>

            {/* 퀵 통계 */}
            <div className="quick-stats card">
                <div className="card-header">
                    <h4>실시간 통계</h4>
                </div>
                <div className="card-body">
                    <div className="stat-item">
                        <Zap size={16} />
                        <span>활성 사용자: 1,247명</span>
                    </div>
                    <div className="stat-item">
                        <TrendingUp size={16} />
                        <span>오늘 거래 수: 89건</span>
                    </div>
                    <div className="stat-item">
                        <Users size={16} />
                        <span>현재 접속자 수: 156명</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarLeft;
