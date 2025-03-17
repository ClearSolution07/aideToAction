import "react-multi-carousel/lib/styles.css";
import "../pages/auth/home.css";

const SupportersCarousel = ({ supporters }) => {
    const psychologists = supporters;

    return (
        <div className="psychologist-background-container">
            <div className="psychologist-container">
                <h2 className="support-heading">Our Supporters and Donors</h2>

                <div className="carousel-wrapper">
                    {psychologists.map((psychologist, index) => (
                        <div
                            className={`carousel-card ${index % 3 !== 2 ? "border-right" : ""} ${
                                index < 3 ? "border-bottom" : ""
                            }`}
                            key={psychologist.id}
                        >
                            <img
                                src={psychologist.image}
                                alt={psychologist.name}
                                className="psycho-card-image"
                            />
                            <p className="card-text">{psychologist.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SupportersCarousel;
