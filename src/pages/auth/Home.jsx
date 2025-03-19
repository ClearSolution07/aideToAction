import { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import "./home.css";
import homeCarouselData from "../../components/jsons/homeCarouselData.json";
import supporters from "../../components/jsons/supporters.json";
import SupportersCarousel from "../../components/SupportersCarousel";
import VisionMission from "../../components/VisionMission";
import Footer from "../../components/FooterComponent";
import HomeCarousel from "../../components/HomeCarousel";

const Home = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const aboutSection = document.querySelector(".about-container");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (aboutSection) observer.observe(aboutSection);

        return () => {
            if (aboutSection) observer.unobserve(aboutSection);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="home-container">
            {/* Overlay to detect outside clicks */}
            {isMenuOpen && (
                <div className="sidebar-overlay show" onClick={closeMenu}></div>
            )}

            {/* Hamburger Menu Button */}
            <button className="hamburger-btn" onClick={toggleMenu}>
                {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>

            {/* Sidebar Menu */}
            <div className={`sidebar-home ${isMenuOpen ? "open" : ""}`}>
                <div style={{ marginTop: "60px", fontSize: "20px" }}>
                    <button className="dropdown-header">Our Initiatives</button>

                    {/* Join Us Section */}
                    <div className="custom-dropdown">
                        <button
                            className="dropdown-header"
                            onClick={toggleDropdown}
                        >
                            <span>Join us</span>
                            <DownOutlined
                                className={`dropdown-arrow ${
                                    isDropdownOpen ? "open" : ""
                                }`}
                            />
                        </button>

                        <div
                            className={`dropdown-content ${
                                isDropdownOpen ? "show" : ""
                            }`}
                        >
                            <button className="panel-button">Voluntary</button>
                            <button className="panel-button">
                                Collaborate
                            </button>
                            <button className="panel-button">Donate</button>
                            <button className="panel-button">Careers</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div>
                <HomeCarousel homeCarouselData={homeCarouselData} />
            </div>

            <div className="signUp-container">
                <div className="left-side">
                    {/* About Us Section with Animation */}
                    <div className="about-container" id="aboutSection">
                        <div className="disclaimer-container">
                            <h1 className="about-heading">About Saarthi</h1>
                            <p className="about-text">
                                <div className="about-description">
                                    Saarthi is an association of Indian
                                    careleavers which brings together all the
                                    careleavers that is those young adults who
                                    have lived and grown-up in ChildCare
                                    Institutions. This association is for
                                    careleavers and by careleavers.
                                </div>

                                <div className="about-description">
                                    The association in its initial phase has
                                    been hosted by Aide et Action in partnership
                                    with UNICEF and supported by many civil
                                    society organisations across the country.
                                    The core group of association comprises of
                                    representatives from various state level
                                    networks which are a formal or informal
                                    group of care leavers at State/District
                                    level irrespective of their
                                    religion/class/gender/sexual
                                    orientation/physical ability/type of their
                                    institution. You do not have to be a member
                                    of any state or district network to join
                                    Saarthi or sign-up here, but you must be a
                                    careleaver.
                                </div>
                                <div className="about-description-bottom">
                                    With an outreach to more than 4000
                                    careleavers across India, we welcome you
                                    with open arms and hearts to join us and be
                                    a part of this wonderful family. Please
                                    sign-up to become a member else log-in.
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="about-container" id="aboutSection">
                        <div className="disclaimer-container">
                            <h1 className="about-heading">Care Leavers</h1>
                            <p className="about-text">
                                <div className="about-description">
                                    Saarthi is an association of Indian
                                    careleavers which brings together all the
                                    careleavers that is those young adults who
                                    have lived and grown-up in ChildCare
                                    Institutions. This association is for
                                    careleavers and by careleavers.
                                </div>

                                <div className="about-description">
                                    The association in its initial phase has
                                    been hosted by Aide et Action in partnership
                                    with UNICEF and supported by many civil
                                    society organisations across the country.
                                    The core group of association comprises of
                                    representatives from various state level
                                    networks which are a formal or informal
                                    group of care leavers at State/District
                                    level irrespective of their
                                    religion/class/gender/sexual
                                    orientation/physical ability/type of their
                                    institution. You do not have to be a member
                                    of any state or district network to join
                                    Saarthi or sign-up here, but you must be a
                                    careleaver.
                                </div>
                                <div className="about-description-bottom">
                                    With an outreach to more than 4000
                                    careleavers across India, we welcome you
                                    with open arms and hearts to join us and be
                                    a part of this wonderful family. Please
                                    sign-up to become a member else log-in.
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="purpose-container" id="vissionSection">
                <VisionMission />
            </div>

            <div className="disclaimer-main">
                <div className="disclaimer-title">
                    <h2 className="vision-title">*Disclaimer*</h2>
                </div>
                <div className="disclaimer-description">
                    Setting up an appointment with us is simple...
                </div>
            </div>

            <div id="supportersSection">
                <SupportersCarousel supporters={supporters} />
            </div>

            <Footer />
        </div>
    );
};

export default Home;
