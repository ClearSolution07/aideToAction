import React, { useState, useEffect, useRef } from "react";
import "./css/homeCarousel.css";

const HomeCarousel = ({ homeCarouselData }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        let interval;
        if (isAutoPlaying && !isHovered) {
            interval = setInterval(() => {
                setCurrentSlide((prev) =>
                    prev === homeCarouselData?.length - 1 ? 0 : prev + 1
                );
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [homeCarouselData, isAutoPlaying, isHovered]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume autoplay after manual navigation
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    if (!homeCarouselData?.length) {
        return <div className="carousel-empty">No images available</div>;
    }

    return (
        <div 
            className="carousel-root"
            ref={carouselRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="carousel-container"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {homeCarouselData.map((item, index) => (
                    <div key={item.id} className="carousel-slide">
                        <img
                            src={item.image}
                            alt={`Slide ${index + 1}`}
                            className="carousel-image"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
            <div className="carousel-dots-overlay">
                {homeCarouselData.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeCarousel;
