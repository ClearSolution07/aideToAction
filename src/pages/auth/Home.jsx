import { useState } from "react";
import "./home.css";
import { Modal } from "antd";
import logo from "../../assets/mainLogo.svg";
import rightImage from "../../assets/homeRightImage.png";
import commitmentData from "../../components/jsons/commitmentData.json";
import psychologists from "../../components/jsons/psychologists.json";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

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
                {/* Left Side */}
                <div className="left-side">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <h1 className="heading">
                        Learn with expert anytime anywhere
                    </h1>
                    <p className="description">
                        The term Care Leavers/care experienced youth is being
                        used for those people who are have lived atleast three
                        years (or less depending on their personal
                        circumstances) in any Child Care Institution.
                    </p>
                </div>

                {/* Right Side */}
                <div className="right-side">
                    <img
                        src={rightImage}
                        alt="Right Side Graphic"
                        className="right-image"
                    />
                </div>
            </div>
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
                                .slice(0, 4)
                                .map((commitment, index) => (
                                    <div
                                        key={index}
                                        className="commitment-card"
                                    >
                                        <img
                                            src={commitment.image}
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

            {/* <div>Vision & Mission</div> */}
            <div className="psychologist-background-container">
                <div className="psychologist-container">
                    <h2 className="heading">Our Supporters And Donors</h2>
                    <div className="card-row">
                        {psychologists.map((psychologist) => (
                            <div className="card" key={psychologist.id}>
                                <img
                                    src={psychologist.image}
                                    alt={psychologist.name}
                                    className="psycho-card-image"
                                />
                                <h3 className="card-name">
                                    {psychologist.name}
                                </h3>
                                <p className="card-occupation">
                                    {psychologist.occupation}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="ending-text">
                        Start the wonderful journey now!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
