import React, { useEffect, useRef } from "react";
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
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const refsToObserve = [
            titleRef.current,
            descriptionRef.current,
            ...cardRefs.current,
        ].filter(Boolean);

        refsToObserve.forEach((ref) => observer.observe(ref));

        return () => {
            refsToObserve.forEach((ref) => observer.unobserve(ref));
        };
    }, []);

    return (
        <section className="vision-mission-container">
            <h2 ref={titleRef} className="title">
                Vision and Mission
            </h2>

            <p ref={descriptionRef} className="description">
                Our vision is to create an inclusive and empowering community
                for careleavers across India, ensuring their holistic
                development and independence. Our mission is to unite
                careleavers, advocate for their rights, and provide access to
                opportunities through collaboration and support networks.
                Together, we strive to build a future where every careleaver can
                thrive with dignity and confidence.
            </p>

            <div className="cards-container">
                {visionMissionData.map((item, index) => (
                    <div
                        ref={(el) => (cardRefs.current[index] = el)}
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
