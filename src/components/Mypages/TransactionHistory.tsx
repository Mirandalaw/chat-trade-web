import React from 'react';
import { Clock } from 'lucide-react';
import '../../styles/pages/Mypages/TransactionHistory.css';

interface Transaction {
    id: string;
    partner: string;
    item: string;
    status: '완료' | '대기' | '취소';
    date: string;
}

const TransactionHistory: React.FC = () => {
    const transactions: Transaction[] = [
        { id: '1', partner: '김철수', item: '아이폰 14 Pro', status: '완료', date: '2024-01-15' },
        { id: '2', partner: '이영희', item: '맥북 에어', status: '대기', date: '2024-01-14' },
        { id: '3', partner: '박민수', item: '갤럭시 S24', status: '완료', date: '2024-01-13' },
        { id: '4', partner: '정미래', item: 'AirPods Pro', status: '취소', date: '2024-01-12' },
        { id: '5', partner: '한지민', item: '아이패드', status: '완료', date: '2024-01-11' },
    ];

    const getStatusBadge = (status: string) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        switch (status) {
            case '완료':
                return `${baseClasses} bg-emerald-100 text-emerald-700`;
            case '대기':
                return `${baseClasses} bg-orange-100 text-orange-700`;
            case '취소':
                return `${baseClasses} bg-gray-100 text-gray-700`;
            default:
                return baseClasses;
        }
    };

    return (
        <div className="transaction-card">
            <div className="transaction-header">
                <div className="transaction-icon">
                    <Clock size={20} color="white" />
                </div>
                <h3 className="transaction-title">최근 거래 내역</h3>
            </div>

            <div className="transaction-list">
                {transactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                        <div className="transaction-info">
                            <div className="transaction-partner">
                                <span className="transaction-partner-name">{transaction.partner}</span>
                                <span className={getStatusBadge(transaction.status)}>
                  {transaction.status}
                </span>
                            </div>
                            <p className="transaction-item-name">{transaction.item}</p>
                        </div>
                        <span className="transaction-date">{transaction.date}</span>
                    </div>
                ))}
            </div>

            <button className="transaction-view-all">
                전체 거래 내역 보기
            </button>
        </div>
    );
};

export default TransactionHistory;