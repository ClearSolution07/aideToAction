import { useState } from "react";
import "./Updates.css"; // Reuse styles from Updates
import pdfImg from "/img/pdfLogo.png";

const guidelineDocuments = [
    {
        id: 1,
        title: "Uttar Pradesh Aftercare Guidelines",
        pdfUrl: "/resource/up.pdf",
    },
    {
        id: 2,
        title: "West Bengal Aftercare Guidelines",
        pdfUrl: "/resource/wb.pdf",
    },
    {
        id: 3,
        title: "Alternative Care and De-Institutionalisation Plan for Karnataka",
        pdfUrl: "/resource/ac.pdf",
    },
    {
        id: 4,
        title: "Chhattisgarh (After Care Scheme)",
        pdfUrl: "/resource/ch.pdf",
    },
    {
        id: 5,
        title: "Compilation of the Current Aftercare Practices (Updated 20th Feb)",
        pdfUrl: "/resource/comp.pdf",
    },
    {
        id: 6,
        title: "Guidelines for Aftercare under ICPS",
        pdfUrl: "/resource/icps.pdf",
    },
    {
        id: 7,
        title: "Haryana Harihar Policy",
        pdfUrl: "/resource/hr.pdf",
    },
    {
        id: 8,
        title: "Jharkhand After Care Guidelines 2023",
        pdfUrl: "/resource/jh.pdf",
    },
    {
        id: 9,
        title: "Karnataka Aftercare Guidelines",
        pdfUrl: "/resource/ka.pdf",
    },
    {
        id: 10,
        title: "Maharashtra June 2019 Guidelines",
        pdfUrl: "/resource/mh.pdf",
    },
    {
        id: 11,
        title: "Mission Vatsalya Guideline",
        pdfUrl: "/resource/mv.pdf",
    },
    {
        id: 12,
        title: "Mizoram Guidelines for After Care 2017",
        pdfUrl: "/resource/mz.pdf",
    },
    {
        id: 13,
        title: "MP Baal Ashirwad Scheme",
        pdfUrl: "/resource/mp.pdf",
    },
    {
        id: 14,
        title: "Odisha AfterCare Guidelines 2020",
        pdfUrl: "/resource/od.pdf",
    },
    {
        id: 15,
        title: "Rajasthan Aftercare Guideline",
        pdfUrl: "/resource/rj.pdf",
    },
    {
        id: 16,
        title: "Rehabilitation and Social Reintegration Delhi",
        pdfUrl: "/resource/dl.pdf",
    },
    {
        id: 17,
        title: "Gujarat After Care (English)",
        pdfUrl: "/resource/gj.pdf",
    },
];

import { Modal } from "antd";

const ResourceLibrary = () => {
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
            <h1 className="updates-title">Resource Library</h1>
            <p className="updates-subtitle">
                Access aftercare guidelines and policies from across India.
            </p>
            <div className="pdf-grid">
                {guidelineDocuments.map((doc) => (
                    <div key={doc.id} className="pdf-card">
                        <img
                            src={pdfImg}
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
                        <a href={doc.pdfUrl} download className="download-link">
                            Download PDF
                        </a>
                    </div>
                ))}
            </div>

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

export default ResourceLibrary;
