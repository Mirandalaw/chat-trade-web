import React from 'react';
import '../styles/Foot.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>GoodIsGood</h4>
              <p>실시간 채팅으로 안전하게 아이템을 거래할 수 있는 최고의 플랫폼입니다.</p>
            </div>

            <div className="footer-section">
              <h5>회사 정보</h5>
              <ul>
                <li><a href="#about">회사 소개</a></li>
                <li><a href="#careers">채용 정보</a></li>
                <li><a href="#contact">문의하기</a></li>
                <li><a href="#blog">블로그</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>고객 지원</h5>
              <ul>
                <li><a href="#help">도움말 센터</a></li>
                <li><a href="#safety">안전 가이드</a></li>
                <li><a href="#community">커뮤니티</a></li>
                <li><a href="#faq">자주 묻는 질문</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>법적 고지</h5>
              <ul>
                <li><a href="#privacy">개인정보처리방침</a></li>
                <li><a href="#terms">이용약관</a></li>
                <li><a href="#cookies">쿠키 정책</a></li>
                <li><a href="#dmca">저작권 정책 (DMCA)</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {currentYear} GoodIsGood. 모든 권리 보유.</p>
            <div className="footer-social">
              <a href="#twitter" aria-label="Twitter">트위터</a>
              <a href="#discord" aria-label="Discord">디스코드</a>
              <a href="#reddit" aria-label="Reddit">레딧</a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
