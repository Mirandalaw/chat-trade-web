import React from 'react';
import UserInfoCard from './UserInfoCard';
import MarketPriceCard from './MarketPriceCard';
import ChatManagementButton from './ChatManagementButton';
import '../styles/SidebarRight.css';

const SidebarRight: React.FC = () => {
    return (
        <>
            <div className="sidebar-right">
                <UserInfoCard />
                <MarketPriceCard />
            </div>
            <ChatManagementButton />
        </>
    );
};

export default SidebarRight;