import { useState } from "react";
import { Collapse, Modal } from "antd";
import StarsViewer from "../layout/StarsViewer";
import starsImg from "/img/pdfImg/Dec.png";
import janImg from "/img/pdfImg/Jan.png";
import decImg from "/img/pdfImg/Dec.png";
import novImg from "/img/pdfImg/Nov.png";
import febImg from "/img/pdfImg/Feb.png";
import marImg from "/img/pdfImg/Mar.png";
import "./Updates.css";

const { Panel } = Collapse;

const newsletterDocuments = [
    {
        category: "March 2025",
        description: "Empowering Care Leavers: Building Stronger Communities Together.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/marchnews.pdf",
                img: marImg,
            },
        ],
    },
    {
        category: "February 2025",
        description: "Creating Opportunities, Building Futures: Care Leavers' Journey to Success.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/febnews.pdf",
                img: febImg,
            },
        ],
    },
    {
        category: "January 2025",
        description:
            "Karnataka Care Leavers: Uniting Voices, Empowering Futures.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/january.pdf",
                img: janImg,
            },
        ],
    },
    {
        category: "December 2024",
        description:
            "Empowering care leavers with skills, collaboration, and a sense of community is the first step toward building a future where they thrive, lead, and contribute to society.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/december.pdf",
                img: decImg,
            },
        ],
    },
    {
        category: "November 2024",
        description: "Your Window into the World of CareLeavers.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/november.pdf",
                img: novImg,
            },
        ],
    },
];

const reportDocuments = [
    {
        id: 1,
        title: "STARS Stories of Careleavers",
        pdfUrl: "/pdfs/STARS Stories of Careleavers.pdf",
        img: starsImg,
    },
];

const Updates = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");

    const openPdfModal = (pdfUrl) => {
        setSelectedPdf(pdfUrl);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedPdf("");
    };

    return (
        <div className="updates-corner-content">
            <h1 className="updates-title">
                Stay informed with the latest updates
            </h1>
            <p className="updates-subtitle">
                Explore Saarthi newsletters, event reports, and press
                releases—all in one place. Stay updated on important
                initiatives, community events, and key announcements.
            </p>

            {/* Newsletter Section */}
            <Collapse accordion>
                {/* Report Section */}
                <Panel header="Workshop & Event Reports" key="reports">
                    <div className="pdf-grid">
                        {reportDocuments.map((doc, i) => (
                            <div key={i} className="pdf-card">
                                <img
                                    src={doc.img}
                                    alt="PDF Icon"
                                    className="pdf-image"
                                    onClick={() => openPdfModal(doc.pdfUrl)}
                                />
                                <p
                                    className="pdf-title"
                                    onClick={() => openPdfModal(doc.pdfUrl)}
                                >
                                    {doc.title}
                                </p>
                                <a
                                    href={doc.pdf}
                                    download
                                    className="download-link"
                                >
                                    Download PDF
                                </a>
                            </div>
                        ))}
                    </div>
                </Panel>
                <Panel
                    header="Newsletters (Nov 2024 - Mar 2025)"
                    key="newsletters"
                >
                    {newsletterDocuments.map((group, index) => (
                        <div key={index} className="newsletter-section">
                            <p className="newsletter-desc">
                                {group.description}
                            </p>
                            <div className="pdf-grid">
                                {group.documents.map((doc, docIndex) => (
                                    <div key={docIndex} className="pdf-card">
                                        <img
                                            src={doc.img}
                                            alt="PDF Icon"
                                            className="pdf-image"
                                            onClick={() =>
                                                openPdfModal(doc.pdf)
                                            }
                                        />
                                        <p
                                            className="pdf-title"
                                            onClick={() =>
                                                openPdfModal(doc.pdf)
                                            }
                                        >
                                            {doc.title}
                                        </p>
                                        <a
                                            href={doc.pdf}
                                            download
                                            className="download-link"
                                        >
                                            Download PDF
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </Panel>
            </Collapse>

            {/* PDF Modal */}
            <Modal
                title="Document Preview"
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
                width={800}
                centered
            >
                {selectedPdf && (
                    <iframe
                        src={selectedPdf}
                        title="PDF Viewer"
                        className="pdf-viewer"
                        frameBorder="0"
                        style={{ width: "100%", height: "80vh" }}
                    />
                )}
            </Modal>
        </div>
    );
};

export default Updates;
