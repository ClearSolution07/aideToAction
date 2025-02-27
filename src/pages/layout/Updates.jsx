import { Collapse, Modal } from "antd";
import { useState } from "react";
import "./Updates.css";

const { Panel } = Collapse;

const documentGroups = [
    {
        category: "January 2025",
        description:
        "Karnataka Care Leavers: Uniting Voices, Empowering Futures.",
        documents: [
            {
                title: "Monthly Newsletter",
                pdf: "/pdfs/january.pdf",
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
            },
        ],
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
            <h2 className="updates-title">
                Stay informed with the latest updates
            </h2>
            <p className="updates-subtitle">
                Explore Saarthi newsletters, event reports, and press
                releases—all in one place. Stay updated on important
                initiatives, community events, and key announcements.
            </p>

            <Collapse expandIconPosition="end" accordion>
                {documentGroups.map((group, index) => (
                    <Panel
                        header={group.category}
                        key={index}
                        className="custom-panel"
                    >
                        <p className="panel-content">{group.description}</p>
                        <div className="pdf-row">
                            {group.documents.map((doc, docIndex) => (
                                <div key={docIndex} className="pdf-container">
                                    <p
                                        className="pdf-title clickable"
                                        onClick={() => openPdfModal(doc.pdf)}
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
                ))}
            </Collapse>
            <Modal
                title="Document Preview"
                open={isModalVisible}
                onCancel={closeModal}
                footer={null}
                width="fit-content"
                style={{
                    maxWidth: "90vw",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {selectedPdf && (
                    <div className="pdf-viewer-container">
                        <iframe
                            src={selectedPdf}
                            title="PDF Viewer"
                            className="pdf-viewer"
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Updates;
