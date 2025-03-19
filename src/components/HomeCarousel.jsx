import React, { useState, useEffect } from "react";
import "./css/homeCarousel.css";
import logo from "../assets/mainLogo.svg";

import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import LogIn from "../pages/auth/LogIn";

const HomeCarousel = ({ homeCarouselData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const psychologists = homeCarouselData;
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === psychologists?.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [psychologists]);

    if (!psychologists?.length) {
        return <div className="carousel-empty">No supporters available</div>;
    }

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
        <div className="carousel-root">
            {/* Fixed overlay content */}
            <div className="carousel-overlay">
                <img src={logo} alt="Logo" className="carousel-logo" />
                <h1 className="carousel-heading">Association of Careleavers</h1>
                <p className="carousel-description">
                    The vision of Saarthi which is an association of Indian
                    Careleavers is to advocate for and to empower care leaving
                    youth transitioning out of child care institutions (CCI) and
                    other forms of alternative care.
                </p>
                <div className="btns-carousel">
                    <button className="btn-signin" onClick={showModal}>
                        Sign In
                    </button>
                    <button
                        className="btn-signin btn-mar"
                        onClick={redirectToregister}
                    >
                        Sign Up
                    </button>
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

            {/* Scrolling images */}
            <div
                className="carousel-container"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {psychologists.map((psychologist) => (
                    <div key={psychologist.id} className="carousel-slide">
                        <img
                            src={psychologist.image || "/placeholder.jpg"}
                            alt={psychologist.name}
                            className="carousel-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
