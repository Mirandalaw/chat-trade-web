import React from 'react';
import '../styles/Foot.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>TradeChat</h4>
              <p>The ultimate platform for secure item trading with real-time chat.</p>
            </div>

            <div className="footer-section">
              <h5>Company</h5>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>Support</h5>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#safety">Safety Tips</a></li>
                <li><a href="#community">Community</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h5>Legal</h5>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
                <li><a href="#dmca">DMCA</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {currentYear} TradeChat. All rights reserved.</p>
            <div className="footer-social">
              <a href="#twitter" aria-label="Twitter">Twitter</a>
              <a href="#discord" aria-label="Discord">Discord</a>
              <a href="#reddit" aria-label="Reddit">Reddit</a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
