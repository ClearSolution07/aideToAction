import React, { useEffect, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import "../pages/auth/home.css";

const SupportersCarousel = ({ supporters }) => {
    const psychologists = supporters;
   

    
    return (
        <div className="psychologist-background-container">
            <div className="psychologist-container">
                <h2 className="support-heading">
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
