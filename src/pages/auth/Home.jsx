import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined, BellOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import "./home.css";
import LogIn from "./LogIn";
import logo from "../../assets/logo2.svg";
import homeCarouselData from "../../components/jsons/homeCarouselData.json";
import supporters from "../../components/jsons/supporters.json";
import SupportersCarousel from "../../components/SupportersCarousel";
import VisionMission from "../../components/VisionMission";
import Footer from "../../components/FooterComponent";
import HomeCarousel from "../../components/HomeCarousel";

const Home = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
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

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const redirectToregister = async () => {
        navigate("/register");
    };

    const toggleMenu = () => setMenuOpen(!isMenuOpen);
    const closeMenu = () => setMenuOpen(false);
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

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
                <div className="btn-header-heading">
                    <div className="header-heading-container">
                        <div className="header-heading">Association Of Indian Care Leavers</div>
                        <div className="header-detail">
                            The vision of Saarthi is to advocate for and to empower care leaving youth 
                            transitioning out of child care institutions (CCI) and other forms of
                            alternative care.
                        </div>
                    </div>
                    <div className="new-buttons">
                        {/* 1st Button */}
                        <button
                            className="primary-button"
                            onClick={() => navigate("/resource")}
                        >
                            Resource Library
                        </button>

                        {/* 2nd Button */}
                        <button
                            className="primary-button"
                            onClick={() => navigate("/announcement")}
                        >
                            <span>Announcements</span>
                        </button>

                        {/* 3rd Button */}
                        <button className="primary-button">
                            Our Initiatives
                        </button>

                        {/* Dropdown Button */}

                        <div className="dropdown-container">
                            <button
                                className="primary-button"
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                            >
                                Join us
                                <DownOutlined
                                    className={`dropdown-arrow ${
                                        isDropdownOpen ? "open" : ""
                                    }`}
                                    style={{ marginLeft: "20px" }}
                                />
                            </button>

                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <button className="dropdown-item">
                                        Volunteer
                                    </button>
                                    <button className="dropdown-item">
                                        Collaborate
                                    </button>
                                    <button className="dropdown-item">
                                        Donate
                                    </button>
                                    <button className="dropdown-item">
                                        Work With Us
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="empower">
                <div className="empower-heading">
                    Empowering Youth Beyond Care Systems
                </div>
                <div className="empower-detail">
                    Transitioning from institutional care to independent living
                    can be challenging for care leavers. Aftercare services are
                    essential in supporting them with housing, education,
                    vocational training, mental health support, and financial
                    aid. These services help care leavers build stable,
                    self-sufficient lives and become active members of society.
                    The Vatsalya Scheme, launched by the Government of India,
                    provides comprehensive support to children in need of care
                    and protection, including care leavers. It offers financial
                    assistance, skill development, counseling, and mentorship,
                    helping young people overcome obstacles and pursue their
                    goals. Many care leavers face isolation and limited support
                    once they exit the care system. Networks like{" "}
                    <span style={{ display: "inline", color: "#0f5894" }}>
                        SAARTHI: Association of Indian Careleavers
                    </span>{" "}
                    play a key role in creating a sense of community and
                    connection. These networks—local, regional, or
                    national—offer platforms to share experiences, access
                    resources, and advocate for change. They also help link care
                    leavers to government schemes and services from civil
                    society organizations, ensuring continued support on their
                    journey to independence.
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
            <div className=" signup-container-small">
                <div className="signUp-container ">
                    <div className="right-side">
                        <HomeCarousel homeCarouselData={homeCarouselData} />
                    </div>
                    <div className="left-side">
                        {/* About Us Section with Animation */}
                        <div className="about-container" id="aboutSection">
                            <div className="disclaimer-container">
                                {/* <h1 className="about-heading">Care Leavers</h1> */}
                                <p className="about-text">
                                    <div className="about-description">
                                        <span
                                            style={{
                                                fontSize: "28px",
                                                fontWeight: "400",
                                                color: "#0f5894",
                                                display: "inline",
                                            }}
                                        >
                                            SAARTHI
                                        </span>{" "}
                                        unites young adults who have lived and
                                        grown up in Child Care Institutions.
                                        With an outreach to more than 4,000 care
                                        leavers across India, Saarthi is for
                                        care leavers and is being led by care
                                        leavers.
                                    </div>

                                    <div className="about-description">
                                        In its initial phase, Saarthi was hosted
                                        by Aide et Action in partnership with
                                        UNICEF and supported by numerous civil
                                        society organizations across the
                                        country. The core group of the
                                        association comprise representatives of
                                        various state or district level
                                        careleavers' groups or networks,
                                        irrespective of religion, class, gender,
                                        sexual orientation, physical ability, or
                                        the type of institution they lived in.
                                    </div>

                                    <div className="about-description-bottom">
                                        Saathi welcomes you with open arms and
                                        hearts to join us and become part of
                                        this wonderful family. You do not need
                                        to be a member of any state or district
                                        network to join Saarthi or sign up here,
                                        but you must be a care leaver. To become
                                        a member or:
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
                </div>
            </div>

            <div className=" signup-container-large">
                <div className="signUp-container">
                    <div className="left-side">
                        {/* About Us Section with Animation */}
                        <div className="about-container" id="aboutSection">
                            <div className="disclaimer-container">
                                {/* <h1 className="about-heading">Care Leavers</h1> */}
                                <p className="about-text">
                                    <div className="about-description">
                                        <p
                                            style={{
                                                fontSize: "28px",
                                                fontWeight: "400",
                                                color: "#0f5894",
                                                display: "inline",
                                            }}
                                        >
                                            SAARTHI
                                        </p>{" "}
                                        unites young adults who have lived and
                                        grown up in Child Care Institutions.
                                        With an outreach to more than 4,000 care
                                        leavers across India, Saarthi is for
                                        care leavers and is being led by care
                                        leavers.
                                    </div>

                                    <div className="about-description">
                                        In its initial phase, Saarthi was hosted
                                        by Aide et Action in partnership with
                                        UNICEF and supported by numerous civil
                                        society organizations across the
                                        country. The core group of the
                                        association comprise representatives of
                                        various state or district level
                                        careleavers' groups or networks,
                                        irrespective of religion, class, gender,
                                        sexual orientation, physical ability, or
                                        the type of institution they lived in.
                                    </div>

                                    <div className="about-description-bottom">
                                        Saathi welcomes you with open arms and
                                        hearts to join us and become part of
                                        this wonderful family. You do not need
                                        to be a member of any state or district
                                        network to join Saarthi or sign up here,
                                        but you must be a care leaver. To become
                                        a member or:
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
            </div>

            {/* <div className="signUp-container-saarthi">
                <div className="right-side-saarthi">
                    <div
                        className="about-container-saarthi"
                        id="aboutSection-saarthi"
                    >
                        <h1 className="about-heading">About Saarthi</h1>
                        <p className="about-text">
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
            </div> */}

            {/* <div className="purpose-container" id="vissionSection">
                <VisionMission />
            </div> */}

            <div className="disclaimer-main">
                <div className="disclaimer-title">
                    <h2 className="vision-title">*Disclaimer*</h2>
                </div>
                <div className="disclaimer-description">
                    Please note, the Saarthi -AICL has no financial, legal or
                    statutory obligation on either Aide et Action or UNICEF and
                    vice versa. Aide et Action and UNICEF are and will not be
                    accountable for any financial, legal, or statutory
                    repercussions arising out of any activity or statement done
                    or undertaken by members at their individual level or
                    with/to those met here.
                </div>
            </div>

            {/* <div id="supportersSection">
                <SupportersCarousel supporters={supporters} />
            </div> */}

            <Footer />
        </div>
    );
};

export default Home;
