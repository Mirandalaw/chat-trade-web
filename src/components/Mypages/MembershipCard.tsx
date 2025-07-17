import React from 'react';
import { Crown, Star } from 'lucide-react';
import '../../styles/pages/Mypages/MembershipCard.css';

const MembershipCard: React.FC = () => {
    return (
        <div className="membership-card">
            <div className="membership-header">
                <div className="membership-icon">
                    <Crown size={20} color="white" />
                </div>
                <h3 className="membership-title">회원 등급</h3>
            </div>

            <div className="membership-content">
                <div className="membership-grade">
          <span className="membership-grade-name">
            실버
          </span>
                    <div className="membership-stars">
                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                        <Star size={16} fill="#fbbf24" color="#fbbf24" />
                        <Star size={16} color="#d1d5db" />
                    </div>
                </div>

                <div className="membership-benefits">
                    <h4>현재 혜택</h4>
                    <ul>
                        <li>• 거래 수수료 5% 할인</li>
                        <li>• 우선 매칭 서비스</li>
                        <li>• 월 1회 무료 배송</li>
                    </ul>
                </div>

                <div className="membership-upgrade">
                    <h4>골드 승급 조건</h4>
                    <div className="membership-progress">
                        <div className="membership-progress-item">
                            <span>누적 거래 횟수</span>
                            <span className="membership-progress-value">47/50</span>
                        </div>
                        <div className="membership-progress-item">
                            <span>누적 거래 금액</span>
                            <span className="membership-progress-value">180만원/200만원</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MembershipCard;