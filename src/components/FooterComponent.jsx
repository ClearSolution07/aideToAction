import React from "react";
import logo from "../assets/Logo.svg";
import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
} from "@ant-design/icons";
import twitter from "/img/twitter.png";
import ataLogo from "/img/ataLogo.png";
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
        <footer className="footer">
            <div className="container">
                <div
                    className={`footer-grid ${
                        isAuthenticated ? "center-layout" : ""
                    }`}
                >
                    <div className="brand-section">
                        <div className="brand-header">
                            <img src={logo} alt="Logo" className="brand-logo" />
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
                                        Know More About Us
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
                                        Discover Our Purpose
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
                                        Meet Our Supporters
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div className="footer-section">
                        <h3 className="footer-heading">CONTACT US</h3>

                        <ul
                            className="footer-links"
                            style={{ marginBottom: "2rem" }}
                        >
                            <li>
                                <p className="footer-link">
                                    aiclsaarthi@gmail.com
                                </p>
                            </li>
                            <li>
                                <p className="footer-link">+91-8700190013</p>
                            </li>
                        </ul>
                    </div>

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
                                <img
                                    src={twitter}
                                    style={{ height: "25px", width: "25px" }}
                                    alt="Twitter"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">© 2025 - Saarthi</p>
                    <p className="designer-text">
                        Designed by{" "}
                        <strong>
                            <a
                                href="https://clearsolutionss.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="designer-link"
                            >
                                Clear Solutions Services
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
