import React from "react";
import logo from "../assets/logo2.svg";
import whatsapp from "../assets/whatsapp.svg";

import {
    FacebookFilled,
    InstagramFilled,
    LinkedinFilled,
} from "@ant-design/icons";
import twitter from "/img/twitter.png";
import "./css/footer.css";
import supporters from "./jsons/supporters.json";

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
                <div className="footer-grid">
                    <div className="brand-section">
                        <div className="brand-header">
                            <img src={logo} alt="Logo" className="brand-logo" />
                        </div>
                    </div>

                    <div className="footer-section">
                        <div className="footer-heading">
                            Our Supporters and Donors
                        </div>
                        <div className="footer-donor">
                            <div className="footer-img">
                                <img
                                    src={supporters[0].image}
                                    alt="unicef"
                                    className="footer-img1"
                                />
                            </div>
                            <div className="footer-img">
                                <img
                                    src={supporters[1].image}
                                    alt="aidAoAction"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-icon">
                    <div className="contact">
                        <div className="">MAIL US:</div>
                        <div>aiclsaarthi@gmail.com</div>
                        <div className="whatsapp">
                            <img src={whatsapp} alt="whatsapp" />
                            <div>+91 8700190013</div>
                        </div>
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
                            <img
                                src={twitter}
                                style={{ height: "25px", width: "25px" }}
                                alt="Twitter"
                            />
                        </a>
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
