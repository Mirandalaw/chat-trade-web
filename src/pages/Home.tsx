import React from 'react';
import Header from '../../../../workspace/chat-trade-web/src/components/Header';
import SidebarLeft from '../../../../workspace/chat-trade-web/src/components/SidebarLeft';
import SidebarRight from '../../../../workspace/chat-trade-web/src/components/SidebarRight';
import ChatPreviewBox from '../../../../workspace/chat-trade-web/src/components/ChatPreviewBox';
import Footer from '../../../../workspace/chat-trade-web/src/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="app-container">
      <div className="main-layout">
        <Header />
        <div className="content-wrapper">
          <SidebarLeft />
          <div className="main-content">
            <ChatPreviewBox />
          </div>
          <SidebarRight />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;