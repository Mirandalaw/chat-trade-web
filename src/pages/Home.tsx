import React from 'react';
import Header from '../components/Header';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import PublicChat from '../components/PublicChat';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
      <div className="app-container">
        <div className="main-layout">
          <Header />
          <div className="content-wrapper">
            <SidebarLeft />
            <div className="main-content">
              <PublicChat />
            </div>
            <SidebarRight />
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default Home;