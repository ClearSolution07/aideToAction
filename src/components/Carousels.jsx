import React, { useState } from "react";
import "./css/carousel.css";

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + items.length) % items.length
        );
    };

    return (
        <div className="carousel">
            <button className="carousel-button prev" onClick={prevSlide}>
                &#10094;
            </button>
            <div className="carousel-content">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${
                            index === currentIndex ? "active" : ""
                        }`}
                    >
                        <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                        />
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            <button className="carousel-button next" onClick={nextSlide}>
                &#10095;
            </button>
        </div>
    );
};

export default Carousel;
