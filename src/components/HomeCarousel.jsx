import React, { useState, useEffect } from "react";
import "./css/homeCarousel.css";

const HomeCarousel = ({ psychologists }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    return (
        <div className="carousel-root">
            <div
                className="carousel-container"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {psychologists.map((psychologist, index) => (
                    <div key={psychologist.id} className="carousel-slide">
                        <div className="carousel-content">
                            <div className="carousel-text">
                                <h3 className="carousel-title">
                                    {psychologist.name}
                                </h3>
                                <p className="carousel-subtitle">
                                    {psychologist.occupation}
                                </p>
                            </div>
                            <div className="carousel-image-container">
                                <img
                                    src={
                                        psychologist.image || "/placeholder.jpg"
                                    }
                                    alt={psychologist.name}
                                    className="carousel-image"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="carousel-dots">
                {psychologists.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${
                            index === currentSlide ? "active" : ""
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
