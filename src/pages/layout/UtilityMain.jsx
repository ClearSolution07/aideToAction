import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "./UtilityMain.css";
import utility1Img from "../../img/utility1.svg";
import utility2Img from "../../img/utility2.svg";
import UtilityCorner from "./UtilityCorner";
import Updates from "./Updates";

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

    const handleCardClick = (component) => {
        setActiveComponent(component);
    };

    const handleBackClick = () => {
        setActiveComponent(null);
    };

    return (
        <div className="utility-section">
            {!activeComponent ? (
                <>
                    <h1>Access psycho-social support</h1>
                    <p className="utility-subheading">
                        Through experts and mentors, gain healing through art,
                        Pranayam, breathwork, and other healing tools
                    </p>
                    <div className="utility-card-container">
                        <div
                            className="utility-card"
                            onClick={() => handleCardClick("document")}
                        >
                            <img
                                src={utility1Img}
                                alt="document"
                               
                            />
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
                    </div>
                </>
            ) : activeComponent === "document" ? (
                <CounselingComponent onBack={handleBackClick} />
            ) : (
                <MentorComponent onBack={handleBackClick} />
            )}
        </div>
    );
};

export default UtilityMain;
