import React, { useEffect, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import "../pages/auth/home.css";

const SupportersCarousel = ({ supporters }) => {
    const psychologists = supporters;
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
                    {psychologists.map((psychologist) => (
                        <div className="carousel-card" key={psychologist.id}>
                            <img
                                src={psychologist.image}
                                alt={psychologist.name}
                                className="psycho-card-image"
                            />
                        </div>
                    ))}
                   
                </div>
            </div>
        </div>
    );
};

export default SupportersCarousel;
