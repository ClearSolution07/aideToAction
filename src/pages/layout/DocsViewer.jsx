import { useState } from "react";
import { X } from "lucide-react";
import workshopImg from "/img/pdfImg/Workshop.png";

import "./Newsletter.css";

const newsletters = [
    {
        id: 1,
        title: "Workshop Report - January 2025",
        pdfUrl: "/pdfs/sarthiReport.pdf",
        img: workshopImg,
    },
];

const DocsViewer = () => {
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

            {selectedPdf && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <button
                                onClick={() => setSelectedPdf(null)}
                                className="close-button"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-content">
                            <iframe
                                src={selectedPdf}
                                title="PDF Preview"
                                className="pdf-viewer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocsViewer;
