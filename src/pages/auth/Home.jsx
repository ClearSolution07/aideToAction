import { useEffect, useState } from "react";
import "./home.css";
import { Modal } from "antd";
import logo from "../../assets/mainLogo.svg";
import homeCarouselData from "../../components/jsons/homeCarouselData.json";
import supporters from "../../components/jsons/supporters.json";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";
import SupportersCarousel from "../../components/SupportersCarousel";
import VisionMission from "../../components/VisionMission";
import Footer from "../../components/FooterComponent";
import HomeCarousel from "../../components/HomeCarousel";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        const aboutSection = document.querySelector(".about-container");
        const commitmentSection = document.querySelector(
            ".commitment-container"
        );

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
        if (commitmentSection) observer.observe(commitmentSection);
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const redirectToregister = async () => {
        navigate("/register");
    };

    return (
        <div className="home-container">
            <div className="signin-container">
                <div className="logo-container">
                    <img
                        src={logo || "/placeholder.svg"}
                        alt="Logo"
                        className="logo"
                    />
                </div>
                <div className="new-buttons">
                    {/* First Button */}
                    <button className="primary-button">Our Projects</button>

                    {/* Dropdown Button */}
                    <div className="dropdown-container">
                        <button
                            className="primary-button"
                            onClick={() => setDropdownOpen(!isDropdownOpen)}
                        >
                            Join us <span className="arrow">▼</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item">
                                    Voluntary
                                </button>
                                <button className="dropdown-item">
                                    Collaborate
                                </button>
                                <button className="dropdown-item">
                                    Donate
                                </button>
                                <button className="dropdown-item">
                                    Careers
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title=""
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <LogIn />
            </Modal>

            <div className="signUp-container">
                <button onClick={redirectToregister} className="buttons">
                    SignUp
                </button>
                <button className="buttons" onClick={showModal}>
                    LogIn
                </button>
                <div className="left-side">
                    <h1 className="heading">
                        Learn with expert anytime anywhere
                    </h1>
                    <p className="intro-description">
                        The vision of Saarthi which is an association of Indian
                        Careleavers is to advocate for and to empower care
                        leaving youth transitioning out of child care
                        institutions (CCI) and other forms of alternative care.
                    </p>
                </div>
                <div className="right-side">
                    <HomeCarousel homeCarouselData={homeCarouselData} />
                </div>
            </div>

            {/* About Us Section with Animation */}
            <div className="about-container" id="aboutSection">
                <div className="">
                    <div className="disclaimer-container">
                        <div className="disclaimer-icon"></div>
                        <div className="disclaimer-icon-bottom"></div>
                        <h1 className="about-heading">About Us</h1>
                        <p className="disclaimer-text">
                            <div className="about-description">
                                Saarthi is an association of Indian careleavers
                                which brings together all the careleavers that
                                is those young adults who have lived and
                                grown-up in ChildCare Institutions. This
                                association is for careleavers and by
                                careleavers.
                            </div>
                            <div className="about-description">
                                The association in its initial phase has been
                                hosted by Aide et Action in partnership with
                                UNICEF and supported by many civil society
                                organisations across the country. The core group
                                of association comprises of representatives from
                                various state level networks which are a formal
                                or informal group of care leavers at
                                State/District level irrespective of their
                                religion/class/gender/sexual
                                orientation/physical ability/type of their
                                institution. You do not have to be a member of
                                any state or district network to join Saarthi or
                                sign-up here, but you must be a careleaver.
                            </div>
                            <div className="about-description-bottom">
                                With an outreach to more than 4000 careleavers
                                across India, we welcome you with open arms and
                                hearts to join us and be a part of this
                                wonderful family. Please sign-up to become a
                                member else log-in.
                            </div>
                        </p>
                    </div>
                </div>
                <div className="">
                    <p className="disclaimer-home">
                        <p style={{ marginBottom: 16 }}>
                            <strong>*Disclaimer*</strong>{" "}
                        </p>
                        Please note, the Saarthi -AICL has no financial, legal
                        or statutory obligation on either Aide et Action or
                        UNICEF and vice versa. Aide et Action and UNICEF are and
                        will not be accountable for any financial, legal, or
                        statutory repercussions arising out of any activity or
                        statement done or undertaken by members at their
                        individual level.{" "}
                    </p>
                </div>
            </div>

            <div className="purpose-container" id="vissionSection">
                <VisionMission />
            </div>
            <div id="supportersSection">
                <SupportersCarousel supporters={supporters} />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
