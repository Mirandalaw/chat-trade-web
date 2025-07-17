import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import type { ItemPrice } from '../types';
import '../styles/MarketPriceCard.css';

const MarketPriceCard: React.FC = () => {
    const itemPrices: ItemPrice[] = [
        { name: '전설 검', price: 5200, trend: 'up' },
        { name: '마법 방패', price: 2600, trend: 'down' },
        { name: '회복 물약', price: 850, trend: 'up' },
        { name: '엘프 활', price: 3400, trend: 'up' },
        { name: '용 갑옷', price: 7800, trend: 'down' }
    ];

    const getTrendIcon = (trend: 'up' | 'down') => {
        return trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />;
    };

    const getTrendColor = (trend: 'up' | 'down') => {
        return trend === 'up' ? 'var(--accent-teal)' : 'var(--accent-red)';
    };

    const getTrendPercentage = () => {
        return Math.floor(Math.random() * 15) + 1; // Random percentage for demo
    };

    return (
        <div className="market-price-card">
            <div className="card-header">
                <div className="header-title">
                    <BarChart3 size={20} />
                    <h3>실시간 시세</h3>
                </div>
                <div className="last-updated">
                    방금 전 업데이트
                </div>
            </div>

            <div className="price-list">
                {itemPrices.map((item, index) => (
                    <div key={index} className="price-item">
                        <div className="item-info">
                            <span className="item-name">{item.name}</span>
                            <div className="price-trend">
                <span
                    className="trend-indicator"
                    style={{ color: getTrendColor(item.trend) }}
                >
                  {getTrendIcon(item.trend)}
                    {getTrendPercentage()}%
                </span>
                            </div>
                        </div>
                        <div className="item-price">
                            {item.price.toLocaleString()}
                            <span className="currency">P</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="market-footer">
                <button className="view-chart-button">
                    <BarChart3 size={14} />
                    상세 차트 보기
                </button>
            </div>
        </div>
    );
};

export default MarketPriceCard;