import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
      <header className="header">
        <div className="header-container">
          {/* 왼쪽: 메뉴버튼 + 로고 */}
          <div className="header-left">
            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="메뉴 열기/닫기"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="logo">
              <Link to="/" className="logo-link" aria-label="홈으로 이동">
                <Logo width={100} height="auto" />
              </Link>
            </div>
          </div>

          {/* 중앙: 검색창 */}
          <div className="header-center">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="아이템, 사용자, 거래 검색..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
              </div>
            </form>
          </div>

          {/* 오른쪽: 액션 버튼 */}
          <div className="header-right">
            <div className="header-actions">
              <button className="btn btn-sm btn-outline">
                거래 생성
              </button>
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
            <div className="mobile-menu">
              <nav className="mobile-nav">
                <a href="#" className="mobile-nav-item">홈</a>
                <a href="#" className="mobile-nav-item">내 거래</a>
                <a href="#" className="mobile-nav-item">보관함</a>
                <a href="#" className="mobile-nav-item">설정</a>
              </nav>
            </div>
        )}
      </header>
  );
};

export default Header;
