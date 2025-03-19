import { useState } from "react";
import "./Updates.css";
import Newsletter from "../layout/Newsletter";
import DocsViewer from "../layout/DocsViewer";

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
            <h1 className="updates-title">
                Stay informed with the latest updates
            </h1>
            <p className="updates-subtitle">
                Explore Saarthi newsletters, event reports, and press
                releases—all in one place. Stay updated on important
                initiatives, community events, and key announcements.
            </p>
            {/* Monthly Newsletters Section */}
            <h1 className="updates-title">Monthly Newsletters</h1>
            <Newsletter />

            {/* Workshop Reports Section */}
            <h1 className="updates-title">Workshop Reports</h1>
            <DocsViewer />
        </div>
    );
};

export default Updates;
