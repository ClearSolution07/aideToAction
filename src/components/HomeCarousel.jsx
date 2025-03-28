import React, { useState, useEffect } from "react";
import "./css/homeCarousel.css";

const HomeCarousel = ({ homeCarouselData }) => {
    const psychologists = homeCarouselData;
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
        </div>
    );
};

export default HomeCarousel;
