import { Collapse, Modal } from "antd";
import { useState } from "react";
import "./UtilityCorner.css";

const { Panel } = Collapse;

const documentGroups = [
    {
        category: "Aadhaar Card",
        description:
            "Find detailed information on how to obtain, update, and manage your Aadhaar Card.",
        documents: [
            {
                title: "Aadhaar Guide",
                pdf: "/pdfs/aadhaar_guide.pdf",
            },
            {
                title: "UIDAI Enrollment & Update",
                pdf: "/pdfs/english_uidai_enrol_update_lg.pdf",
            },
        ],
    },
    {
        category: "PAN Card",
        description:
            "Learn about the essential documents required for applying, updating, or correcting your PAN Card.",
        documents: [
            {
                title: "Documents Required for PAN",
                pdf: "/pdfs/pan_card_guide.pdf",
            },
            {
                title: "Online PAN Application Procedure",
                pdf: "/pdfs/online_pan_application_brief.pdf",
            },
        ],
    },
    {
        category: "Passport",
        description:
            "Learn how to apply for a new passport, renew an old one, or get emergency travel documents.",
        documents: [
            {
                title: "Passport Application Guide",
                pdf: "/pdfs/passport_guide.pdf",
            },
        ],
    },
    {
        category: "Ration Card",
        description: "Know the procedures to apply for a ration card.",
        documents: [
            {
                title: "Ration Card Guide",
                pdf: "/pdfs/ration_card.pdf",
            },
        ],
    },
    {
        category: "Voter ID",
        description:
            "Know the procedures to register for a Voter ID, update your information, or check your status.",
        documents: [
            {
                title: "Voter Registration Guide",
                pdf: "/pdfs/voter_registration.pdf",
            },
            {
                title: "Voter ID Guide",
                pdf: "/pdfs/voter_id_guide.pdf",
            },
        ],
    },

    {
        category: "Caste Certificate",
        description:
            "Know the procedures to register for a a caste certificate online through your state's official website.",
        documents: [
            {
                title: "Caste Certificate Registration Guide",
                pdf: "/pdfs/caste_certificate.pdf",
            },
        ],
    },
    {
        category: "Driving License",
        description:
            "You can download a driving license application form in your particular State from the state Transport website.",
        documents: [
            {
                title: "Driving License Registration Guide",
                pdf: "/pdfs/driving_license.pdf",
            },
           
        ],
    },
    {
        category: "Ayushman Card",
        description:
            "Know the procedures to register for a Ayushman Card, update your information, or check your status.",
        documents: [
            {
                title: "Ayushman Card Registration Guide",
                pdf: "/pdfs/ayushman_guide.pdf",
            },
          
        ],
    },
];

const UtilityCorner = () => {
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
        <div className="utility-corner-content">
            <h1 className="utility-title">
                Your one-stop repository for all essential information!
            </h1>
            <p className="utility-subtitle">
                Access step-by-step guides on obtaining government documents
                like Aadhaar, PAN Card, Passport, and other important
                certificates.
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

export default UtilityCorner;
