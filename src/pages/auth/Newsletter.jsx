import { useState } from "react";
import { Modal } from "antd";
import janImg from "../../img/pdfImg/Jan.png";
import decImg from "../../img/pdfImg/Dec.png";
import novImg from "../../img/pdfImg/Nov.png";
import "./Newsletter.css";

const newsletters = [
    {
        id: 1,
        title: "January 2025",
        pdfUrl: "pdfs/january.pdf",
        img: janImg,
    },
    {
        id: 2,
        title: "December 2024",
        pdfUrl: "/pdfs/december.pdf",
        img: decImg,
    },
    {
        id: 3,
        title: "November 2024",
        pdfUrl: "/pdfs/november.pdf",
        img: novImg,
    },
];

const Newsletter = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);

    return (
        <div className="newsletter-section">
            <div className="newsletter-list">
                {newsletters.map((newsletter) => (
                    <div
                        key={newsletter.id}
                        className="newsletter-card"
                        onClick={() => setSelectedPdf(newsletter.pdfUrl)}
                    >
                        <h3 className="newsletter-title">{newsletter.title}</h3>
                        <img
                            src={newsletter.img}
                            alt={newsletter.title}
                            className="pdf-thumbnail"
                        />
                    </div>
                ))}
            </div>

            <Modal
                open={!!selectedPdf}
                onCancel={() => setSelectedPdf(null)}
                footer={null}
                width="70vw"
                style={{ top: 20 }}
            >
                <iframe
                    src={selectedPdf}
                    title="PDF Preview"
                    className="newsletter-pdf-viewer"
                />
            </Modal>
        </div>
    );
};

export default Newsletter;
