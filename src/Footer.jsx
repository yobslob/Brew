// Footer.jsx
import './footer.css';
import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 Medium Clone. All rights reserved.</p>
                <nav className="footer-links">
                    <a href="/">Terms</a>
                    <a href="/">Privacy</a>
                    <a href="/">About</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
