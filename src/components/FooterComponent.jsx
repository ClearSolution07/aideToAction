import React from "react";
import logo from "../assets/logo2.svg";
import whatsapp from "../assets/whatsapp.svg";
import facebook from "/img/facebook.svg";
import instagram from "/img/instagram.svg";
import linkedin from "/img/linkedin.svg";

import {
    InstagramFilled,
    LinkedinFilled,
} from "@ant-design/icons";
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
                            className="social-icon facebook-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={facebook} alt="Facebook" style={{ width: "60px", height: "60px" }} />
                        </a>
                        <a
                            href="https://www.instagram.com/saarthi_aicl"
                            className="social-icon instagram-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={instagram} alt="Instagram" style={{ width: "60px", height: "60px" }} />
                        </a>
                        <a
                            href="https://www.linkedin.com/company/saarthi-aicl"
                            className="social-icon linkedin-icon"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={linkedin} alt="LinkedIn" style={{ width: "60px", height: "60px" }} />
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
