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
                <div className="left-side">
                    {/* About Us Section with Animation */}
                    <div className="about-container" id="aboutSection">
                        <div className="disclaimer-container">
                            <h1 className="about-heading">About Us</h1>
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
                        <div className="about-button">
                            <button
                                onClick={redirectToregister}
                                className="buttons"
                            >
                                SignUp
                            </button>
                            <button className="buttons" onClick={showModal}>
                                LogIn
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <HomeCarousel homeCarouselData={homeCarouselData} />
                </div>
            </div>

            <div className="purpose-container" id="vissionSection">
                <VisionMission />
            </div>

            <div className="disclaimer-main">
                <div
                    style={{
                        marginBottom: 16,
                        fontSize: "40px",
                        fontWeight: "500",
                    }}
                >
                    <h2 className="vision-title">*Disclaimer*</h2>
                </div>
                <div className="disclaimer-description">
                    Setting up an appointment with us is simple. You can call
                    us, submit an online request, enter our online chat
                    facility, or use our GoFantastic App, which lets you book
                    your whole service in just 4 clicks. If you have an account
                    with us, you can even text us to secure an appointment.
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
