import React from "react";
import "./css/visionMission.css";

const visionMissionData = [
    {
        icon: "👁️",
        title: "Vision",
        bgColor: "#f1d296",
        description:
            " Elements in the subjects that have some purpose & goals for the business company",
    },
    {
        icon: "🎯",
        title: "Mission",
        bgColor: "#ff6636",
        description:
            " Elements in the subjects that have some purpose & goals for the business company",
    },
    {
        icon: "🌴",
        title: "Values",
        bgColor: "#700067",
        description:
            " Elements in the subjects that have some purpose & goals for the business company",
    },
];

const VisionMission = () => {
    return (
        <section className="vision-mission-container">
            <h2 className="title">Vision and Mission</h2>
            <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>

            <div className="cards-container">
                {visionMissionData.map((index) => {
                    return (
                        <div
                            className="cardV "
                            style={{ backgroundColor: `${index.bgColor}` }}
                        >
                            <div className="icon">{index.icon}</div>
                            <div className="titleDes">
                                <h3>{index.title}</h3>
                                <p>{index.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default VisionMission;
