import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SupportersCarousel = ({ psychologists }) => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 6000, min: 4000 },
            items: 5,
        },
        LargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="psychologist-background-container">
            <div className="psychologist-container">
                <h2 className="heading">Our Supporters and Donors</h2>
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
                            <h3 className="card-name">{psychologist.name}</h3>
                            <p className="card-occupation">
                                {psychologist.occupation}
                            </p>
                        </div>
                    ))}
                </Carousel>
                <p className="ending-text">Start the wonderful journey now!</p>
            </div>
        </div>
    );
};

export default SupportersCarousel;
