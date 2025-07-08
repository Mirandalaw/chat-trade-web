import React from 'react';
import { TrendingUp, Users, Zap } from 'lucide-react';
import '../styles/variables.css'
import '../styles/SidebarLeft.css';

const SidebarLeft: React.FC = () => {
  return (
      <div className="sidebar-left">
        <div className="ad-block">
          <TrendingUp size={32} className="ad-icon" />
          <h3 className="ad-title">Boost Your Trades</h3>
          <p className="ad-description">
            Premium membership gets you 2x faster trades and priority support
          </p>
          <button className="btn btn-sm mt-4 translucent-button">
            Learn More
          </button>
        </div>

        <div
            className="ad-block"
            style={{
              background: 'linear-gradient(135deg, var(--accent-red), var(--accent-orange))',
            }}
        >
          <Users size={32} className="ad-icon" />
          <h3 className="ad-title">Join Elite Traders</h3>
          <p className="ad-description">
            Connect with top traders and get exclusive access to rare items
          </p>
          <button className="btn btn-sm mt-4 translucent-button">
            Join Now
          </button>
        </div>

        <div className="quick-stats card">
          <div className="card-header">
            <h4>Quick Stats</h4>
          </div>
          <div className="card-body">
            <div className="stat-item">
              <Zap size={16} />
              <span>Active Traders: 1,247</span>
            </div>
            <div className="stat-item">
              <TrendingUp size={16} />
              <span>Trades Today: 89</span>
            </div>
            <div className="stat-item">
              <Users size={16} />
              <span>Online Now: 156</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SidebarLeft;
