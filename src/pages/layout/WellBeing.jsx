import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "./WellBeing.css";
import counsellingImg from "../../img/counselling.svg";
import mentorImg from "../../img/mentoring.svg";
import healingImg from "../../img/healing.svg";
import Psychologists from "../psychologists/Psychologists";
import Mentors from "../members/Members";
import TherapyWellness from "../youtubeVideo/TherapyWellness";

const CounselingComponent = ({ onBack }) => (
    <div className="wellbeing-content">
        <button className="wellbeing-back-button" onClick={onBack}>
            <LeftOutlined /> Back
        </button>
        <Psychologists />
    </div>
);

const MentorComponent = ({ onBack }) => (
    <div className="wellbeing-content">
        <button className="wellbeing-back-button" onClick={onBack}>
            <LeftOutlined /> Back
        </button>
        <Mentors />
    </div>
);

const HealingComponent = ({ onBack }) => (
    <div className="wellbeing-content">
        <button className="wellbeing-back-button" onClick={onBack}>
            <LeftOutlined /> Back
        </button>
        <TherapyWellness />
    </div>
);

const WellBeing = () => {
    const [activeComponent, setActiveComponent] = useState(null);

    const handleCardClick = (component) => {
        setActiveComponent(component);
    };

    const handleBackClick = () => {
        setActiveComponent(null);
    };

    return (
        <div className="wellbeing-section">
            {!activeComponent ? (
                <>
                    <h1>Access psycho-social support</h1>
                    <p className="wellbeing-subheading">
                        Through experts and mentors, gain healing through art,
                        Pranayam, breathwork, and other healing tools
                    </p>
                    <div className="wellbeing-card-container">
                        <div
                            className="wellbeing-card"
                            onClick={() => handleCardClick("counseling")}
                        >
                            <img
                                src={counsellingImg}
                                alt="Counseling"
                                className="wellbeing-img"
                            />
                            <p>
                                Get professional counseling for mental and
                                emotional challenges
                            </p>
                        </div>
                        <div
                            className="wellbeing-card"
                            onClick={() => handleCardClick("mentor")}
                        >
                            <img
                                src={mentorImg}
                                alt="Mentor"
                                className="wellbeing-img"
                            />
                            <p>Find a mentor here</p>
                        </div>
                        <div
                            className="wellbeing-card"
                            onClick={() => handleCardClick("healing")}
                        >
                            <img
                                src={healingImg}
                                alt="Healing"
                                className="wellbeing-img"
                            />
                            <p>Therapy and healing corner</p>
                        </div>
                    </div>
                </>
            ) : activeComponent === "counseling" ? (
                <CounselingComponent onBack={handleBackClick} />
            ) : activeComponent === "mentor" ? (
                <MentorComponent onBack={handleBackClick} />
            ) : (
                <HealingComponent onBack={handleBackClick} />
            )}
        </div>
    );
};

export default WellBeing;
