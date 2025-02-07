import React from "react";
import logo from "../assets/mainLogo.svg";
import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    TwitterSquareFilled,
} from "@ant-design/icons";

import "./css/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="brand-section">
                        <div className="brand-header">
                            <img src={logo} alt="Logo" className="brand-logo" />
                            <h2 className="brand-name">Saarthi</h2>
                        </div>
                        <div className="social-icons">
                            <a
                                href="https://www.facebook.com/profile.php?id=61562857873961"
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FacebookFilled />
                            </a>
                            <a
                                href="https://www.instagram.com/saarthi_aicl"
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <InstagramFilled />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/saarthi-aicl"
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedinFilled />
                            </a>
                            <a
                                href="https://x.com/CareleaversIND"
                                className="social-icon"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TwitterSquareFilled />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-heading">QUICK LINKS</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="#" className="footer-link">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Career
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h3 className="footer-heading">SUPPORT</h3>
                        <ul className="footer-links">
                            <li>
                                <a href="#" className="footer-link">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Terms & Condition
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="copyright">
                        © 2025 - Saarthi. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
