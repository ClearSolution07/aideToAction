import { useState } from "react";
import "./home.css";
import { Modal } from "antd";
import logo from "../../assets/mainLogo.svg";
import rightImage from "../../assets/homeRightImage.png";
import commitmentData from "../../components/jsons/commitmentData.json";
import acchievementData from "../../components/jsons/commitmentData.json";

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
                <button className="buttons" onClick={showModal}>
                    LogIn
                </button>
                <button onClick={redirectToregister} className="buttons">
                    SignUp
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
            <div className="commitments-container">
                <h1 className="about-heading">Our Commitments</h1>
                <div className="commitments-content">
                    {commitmentData?.map((i, index) => (
                        <div key={index} className="commitment-item">
                            <img src={i.image} alt={i.title} />
                            <div>{i.title}</div>
                            <div>{i.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="achievements-container">
                <h1 className="about-heading">Our Achievements</h1>
                <div className="achievements-content">
                    {acchievementData?.map((i, index) => (
                        <div key={index} className="achievement-item">
                            <img src={i.image} alt={i.title} />
                            <div>{i.title}</div>
                            <div>{i.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
