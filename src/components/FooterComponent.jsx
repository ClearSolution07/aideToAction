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
    // Function to scroll to a particular section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            // Using scrollIntoView for smooth scrolling
            const offsetPosition = element.offsetTop - 120;

            // Smooth scroll to the adjusted position
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth", // Smooth scroll behavior
            });
        }
    };

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
                                <a
                                    href="#"
                                    className="footer-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("aboutSection");
                                    }}
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="footer-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("commitmentSection");
                                    }}
                                >
                                    Commitments
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="footer-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("vissionSection");
                                    }}
                                >
                                    Vision and Mission
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="footer-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("supportersSection");
                                    }}
                                >
                                    Our Supporters
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
