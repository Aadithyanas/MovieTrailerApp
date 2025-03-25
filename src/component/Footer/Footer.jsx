import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn, FaGithub, FaHeart, FaGlobe, FaAndroid, FaApple } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2>MovieTrailer</h2>
                        <p>Your ultimate destination for movie and TV show trailers. Watch, discover, and stay updated with the latest in entertainment.</p>
                        <div className="app-buttons">
                            <button className="app-button">
                                <FaAndroid /> Android App
                            </button>
                            <button className="app-button">
                                <FaApple /> iOS App
                            </button>
                        </div>
                    </div>
                    <div className="social-links">
                        <a href="#" className="social-link" aria-label="Facebook">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className="social-link" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" className="social-link" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="social-link" aria-label="GitHub">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <div className="footer-grid">
                    <div className="footer-section">
                        <h3>Navigation</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Movies</a></li>
                            <li><a href="#">TV Shows</a></li>
                            <li><a href="#">New & Popular</a></li>
                            <li><a href="#">My List</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Comedy</a></li>
                            <li><a href="#">Drama</a></li>
                            <li><a href="#">Horror</a></li>
                            <li><a href="#">Documentary</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Device Support</a></li>
                            <li><a href="#">System Status</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Preferences</a></li>
                            <li><a href="#">Corporate Info</a></li>
                            <li><a href="#">Content Guidelines</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="language-selector">
                        <FaGlobe />
                        <select>
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                    </div>

                    <div className="service-code-section">
                        <button className="service-code">Service Code</button>
                    </div>

                    <div className="copyright">
                        <p>© 2024 MovieTrailer. All rights reserved.</p>
                        <p className="made-with">
                            Made with <FaHeart className="heart-icon" /> by Your Name
                        </p>
                        <p className="region">India</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer; 