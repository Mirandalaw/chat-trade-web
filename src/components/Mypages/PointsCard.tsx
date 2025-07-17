import React from 'react';
import { CreditCard, TrendingUp } from 'lucide-react';
import '../../styles/pages/Mypages/PointsCard.css';

const PointsCard: React.FC = () => {
    return (
        <div className="points-card">
            <div className="points-header">
                <div className="points-icon">
                    <CreditCard size={20} color="white" />
                </div>
                <h3 className="points-title">포인트</h3>
            </div>

            <div className="points-balance">
                <div className="points-amount">
                    <span className="points-amount-value">125,000</span>
                    <span className="points-amount-unit">P</span>
                </div>
                <p className="points-label">보유 포인트</p>
            </div>

            <div className="points-actions">
                <button className="points-button points-button-charge">
                    충전하기
                </button>
                <button className="points-button points-button-withdraw">
                    출금하기
                </button>
            </div>
        </div>
    );
};

export default PointsCard;