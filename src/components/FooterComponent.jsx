import React from "react";
import logo from "../assets/mainLogo.svg";
import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
    TwitterSquareFilled,
} from "@ant-design/icons";
import "./css/footer.css";

const Footer = ({ isAuthenticated }) => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetPosition = element.offsetTop - 120;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <footer className={`footer ${isAuthenticated ? "center-layout" : ""}`}>
            <div className="container">
                <div className="footer-grid">
                    <div
                        className={`brand-section ${
                            isAuthenticated ? "center-content" : ""
                        }`}
                    >
                        <div className="brand-header">
                            <img src={logo} alt="Logo" className="brand-logo" />
                            <h2 className="brand-name">Saarthi</h2>
                        </div>
                    </div>

                    {!isAuthenticated && (
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
                                            scrollToSection(
                                                "commitmentSection"
                                            );
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
                                            scrollToSection(
                                                "supportersSection"
                                            );
                                        }}
                                    >
                                        Our Supporters
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div>
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
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 2025 - Saarthi. Designed by{" "}
                        <strong>
                            <a
                                href="https://clearsolutionss.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="designer-link"
                            >
                                Clear Solutions
                            </a>
                        </strong>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
