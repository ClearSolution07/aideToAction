import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "./UtilityMain.css";
import utility1Img from "/img/utility1.svg";
import utility2Img from "/img/utility2.svg";
import utility3Img from "/img/utility3.svg";
import UtilityCorner from "./UtilityCorner";
import Updates from "./Updates";
import { Button, Layout } from "antd";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";
import { useNavigate } from "react-router-dom";

const CounselingComponent = ({ onBack }) => (
    <div className="utility-content">
        <button className="utility-back-button" onClick={onBack}>
            <LeftOutlined /> Back
        </button>
        <UtilityCorner />
    </div>
);

const MentorComponent = ({ onBack }) => (
    <div className="utiliyt-content">
        <button className="utility-back-button" onClick={onBack}>
            <LeftOutlined /> Back
        </button>
        <Updates />
    </div>
);

const UtilityMain = () => {
    const [activeComponent, setActiveComponent] = useState(null);
    const navigate = useNavigate();

    const handleCardClick = (component) => {
        setActiveComponent(component);
    };

    const handleBackClick = () => {
        setActiveComponent(null);
    };

    return (
        <div>
            <HeaderComponent headerText={"Resource Library"} />
            <div className="utility-section">
                {!activeComponent ? (
                    <>
                        <h1 className="utility-title">
                            Your Resource Hub for Daily Needs & Updates
                        </h1>
                        <p className="utility-subheading">
                            Explore essential resources to navigate your daily
                            life—whether it's applying for government documents
                            or staying updated with Saarthi's latest news,
                            reports, and announcements — all in one place.
                        </p>

                        <div
                            className="utility-card-container"
                            style={{ marginTop: "7%", marginBottom: "7%" }}
                        >
                            <div
                                className="utility-card"
                                onClick={() => handleCardClick("document")}
                            >
                                <img src={utility1Img} alt="document" />
                                <p>Government Document Assistance</p>
                            </div>
                            <div
                                className="utility-card"
                                onClick={() => handleCardClick("updates")}
                            >
                                <img
                                    src={utility2Img}
                                    alt="updates"
                                    className="utility-img"
                                />
                                <p>Saarthi Updates & Reports</p>
                            </div>

                            <div
                                className="utility-card"
                                // onClick={() => handleCardClick("resource")}
                            >
                                <img
                                    src={utility3Img}
                                    alt="resource"
                                    className="utility-img3"
                                />
                                <p>Resource Library</p>
                            </div>
                        </div>
                    </>
                ) : activeComponent === "document" ? (
                    <CounselingComponent onBack={handleBackClick} />
                ) : (
                    <MentorComponent onBack={handleBackClick} />
                )}
            </div>
            <Button
                type="primary"
                icon={<LeftOutlined />}
                style={{
                    border: "none",
                    marging: "5px",
                    fontWeight: "bold",
                    margin: "28px",
                    marginBottom: "16px",

                    // padding: "5px 15px",
                }}
                onClick={() => navigate("/")}
            >
                Home
            </Button>

            <Footer isAuthenticated={true} />
        </div>
    );
};

export default UtilityMain;
