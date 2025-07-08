import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { Search, Menu, X } from 'lucide-react';
import Logo from '../components/Logo';
import {Link} from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
      <header className="header">
        <div className="header-container">
          <div className="header-left">
            <button
                className="menu-toggle"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="logo">
              <Link to="/" className="logo-link" aria-label="홈으로 이동">
                <Logo width={100} height="auto" />
              </Link>
            </div>
          </div>

          <div className="header-center">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search for items, users, or trades..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
              </div>
            </form>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button className="btn btn-sm btn-outline">
                Create Trade
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
            <div className="mobile-menu">
              <nav className="mobile-nav">
                <a href="#" className="mobile-nav-item">Home</a>
                <a href="#" className="mobile-nav-item">My Trades</a>
                <a href="#" className="mobile-nav-item">Inventory</a>
                <a href="#" className="mobile-nav-item">Settings</a>
              </nav>
            </div>
        )}
      </header>
  );
};

export default Header;
