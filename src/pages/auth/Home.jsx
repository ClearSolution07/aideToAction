import { useEffect, useState } from "react";
import "./home.css";
import { Modal } from "antd";
import logo from "../../assets/mainLogo.svg";
import rightImage from "../../assets/homeRightImage.png";
import commitmentData from "../../components/jsons/commitmentData.json";
import psychologists from "../../components/jsons/psychologists.json";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";
import SupportersCarousel from "../../components/SupportersCarousel";
import VisionMission from "../../components/VisionMission";
import Footer from "../../components/FooterComponent";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                <button onClick={redirectToregister} className="buttons">
                    SignUp
                </button>
                <button className="buttons" onClick={showModal}>
                    LogIn
                </button>
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
                    <div className="logo-container">
                        <img
                            src={logo || "/placeholder.svg"}
                            alt="Logo"
                            className="logo"
                        />
                    </div>
                    <h1 className="heading">
                        Learn with expert anytime anywhere
                    </h1>
                    <p className="intro-description">
                        The term Care Leavers/care experienced youth is being
                        used for those people who have lived at least three
                        years (or less depending on their personal
                        circumstances) in any Child Care Institution.
                    </p>
                </div>
                <div className="right-side">
                    
                    <img
                        src={rightImage || "/placeholder.svg"}
                        alt="Right Side Graphic"
                        className="right-image"
                    />
                </div>
            </div>

            {/* About Us Section with Animation */}
            <div className="about-container">
                <h1 className="about-heading">About Us</h1>
                <p className="about-description">
                    Saarthi-Association of Indian Careleavers, is a national
                    association of careleavers for careleavers and by
                    careleavers. Its aim is to create a common platform for care
                    leavers to connect, utilize opportunities of growth, gain
                    referrals for various platforms of support, and bring forth
                    your issues at pan India level. Aide et Action in
                    partnership with UNICEF-India has been its hosting agency
                    while various civil society agencies and State level Women
                    and Child Development Departments have supported it through
                    co-ordination, knowledge sharing and field level support.
                </p>
            </div>

            <div className="commitment-background-container">
                <div className="commitment-container">
                    <h1 className="commitment-heading">Our Commitments</h1>
                    <div className="cards-container">
                        <div className="left-cards">
                            {commitmentData
                                .slice(0, 2)
                                .map((commitment, index) => (
                                    <div
                                        key={index}
                                        className="commitment-card"
                                    >
                                        <img
                                            src={
                                                commitment.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={commitment.title}
                                            className="card-image"
                                        />
                                        <div className="card-content">
                                            <h3 className="card-title">
                                                {commitment.title}
                                            </h3>
                                            <p className="card-description">
                                                {commitment.description}
                                            </p>
                                            <button className="know-more">
                                                Know More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="right-cards">
                            {commitmentData
                                .slice(2)
                                .map((commitment, index) => (
                                    <div
                                        key={index}
                                        className="commitment-card"
                                    >
                                        <img
                                            src={
                                                commitment.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={commitment.title}
                                            className="card-image"
                                        />
                                        <div className="card-content">
                                            <h3 className="card-title">
                                                {commitment.title}
                                            </h3>
                                            <p className="card-description">
                                                {commitment.description}
                                            </p>
                                            <button className="know-more">
                                                Know More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="purpose-container">
                <VisionMission />
            </div>

            <SupportersCarousel psychologists={psychologists} />
            <Footer />
        </div>
    );
};

export default Home;
