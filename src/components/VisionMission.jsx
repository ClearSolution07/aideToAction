import React, { useEffect } from "react";
import "./css/visionMission.css";

const visionMissionData = [
    {
        icon: "👁️",
        title: "Vision",
        bgColor: "#E8f5E9",
        description:
            "To empower care leavers with the tools and support they need to thrive in society and reach their full potential.",
    },
    {
        icon: "🎯",
        title: "Mission",
        bgColor: "#FFF3E0",
        description:
            "To create a robust network of support, resources, and opportunities for care leavers, fostering their personal and professional growth.",
    },
    {
        icon: "🌴",
        title: "Values",
        bgColor: "#E8EAF6",
        description:
            "Elements in the subjects that have some purpose & goals for the business company",
    },
];

const VisionMission = () => {
    useEffect(() => {
        const sections = document.querySelectorAll(".title,.description");

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target); // Stop observing after animation
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <section className="vision-mission-container">
            <h2 className="title">Vision and Mission</h2>
            <p className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="cards-container">
                {visionMissionData.map((item, index) => (
                    <div
                        key={index}
                        className="cardV"
                        style={{ backgroundColor: item.bgColor }}
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="titleDes">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VisionMission;
