import React from 'react';
import { Link, Check } from 'lucide-react';
import '../../styles/pages/Mypages/LoginConnections.css';

interface Connection {
    service: string;
    icon: string;
    connected: boolean;
}

const LoginConnections: React.FC = () => {
    const connections: Connection[] = [
        { service: 'Google', icon: '🔍', connected: true },
        { service: 'Discord', icon: '💬', connected: false },
        { service: 'Kakao', icon: '💛', connected: true },
        { service: 'GitHub', icon: '🐙', connected: false },
    ];

    return (
        <div className="connections-card">
            <div className="connections-header">
                <div className="connections-icon">
                    <Link size={20} color="white" />
                </div>
                <h3 className="connections-title">로그인 연동 관리</h3>
            </div>

            <div className="connections-list">
                {connections.map((connection) => (
                    <div key={connection.service} className="connection-item">
                        <div className="connection-info">
                            <span className="connection-icon">{connection.icon}</span>
                            <span className="connection-name">{connection.service}</span>
                        </div>

                        {connection.connected ? (
                            <div className="connection-status">
                <span className="connection-connected">
                  <Check size={12} />
                  연결됨
                </span>
                                <button className="connection-disconnect">
                                    해제
                                </button>
                            </div>
                        ) : (
                            <button className="connection-connect">
                                연결하기
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoginConnections;