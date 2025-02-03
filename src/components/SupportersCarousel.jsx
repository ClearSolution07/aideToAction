import React, { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../pages/auth/home.css";

const SupportersCarousel = ({ psychologists }) => {
    const headingRef = useRef(null); 

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 6000, min: 3000 }, items: 4 },
        largeDesktop: { breakpoint: { max: 3000, min: 1600 }, items: 3 },
        desktop: { breakpoint: { max: 1600, min: 1000 }, items: 2 },
        tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
        mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
    };

    useEffect(() => {
        const heading = headingRef.current; 

        if (!heading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show"); 
                        observer.unobserve(entry.target); 
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(heading);
        return () => observer.disconnect(); 
    }, []);

    return (
        <div className="psychologist-background-container">
            <div className="psychologist-container">
                <h2 className="heading hidden" ref={headingRef}>
                    Our Supporters and Donors
                </h2>

                <div className="carousel-wrapper">
                    {psychologists && psychologists.length > 0 ? (
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={false}
                            keyBoardControl={true}
                            showDots={true}
                            arrows={true}
                        >
                            {psychologists.map((psychologist) => (
                                <div className="card" key={psychologist.id}>
                                    <img
                                        src={psychologist.image}
                                        alt={psychologist.name}
                                        className="psycho-card-image"
                                    />
                                    <h3 className="card-name">
                                        {psychologist.name}
                                    </h3>
                                    <p className="card-occupation">
                                        {psychologist.occupation}
                                    </p>
                                </div>
                            ))}
                        </Carousel>
                    ) : (
                        <p className="no-data">No supporters available</p>
                    )}
                </div>

                <p className="ending-text">Start the wonderful journey now!</p>
            </div>
        </div>
    );
};

export default SupportersCarousel;
