import { Collapse } from "antd";
import "./UtilityCorner.css";

const aadhaarGuide = "/pdfs/aadhaar_guide.pdf";
const panCardGuide = "/pdfs/pan_card_guide.pdf";
const onlinePanApplicationBrief = "/pdfs/online_pan_application_brief.pdf";
const passportGuide = "/pdfs/passport_guide.pdf";
const voterRegistrationGuide = "/pdfs/voter_registration.pdf";
const voterIdGuide = "/pdfs/voter_id_guide.pdf";
const englishUidaiEnrolUpdateLg = "/pdfs/english_uidai_enrol_update_lg.pdf";

const { Panel } = Collapse;

const documentData = [
    {
        title: "Aadhaar Card",
        content:
            "Find detailed information on how to obtain, update, and manage your Aadhaar Card.",
        pdf: aadhaarGuide,
    },
    {
        title: "PAN Card",
        content:
            "Learn about the essential documents required for applying, updating, or correcting your PAN Card.",
        pdf: panCardGuide,
    },
    {
        title: "Online PAN Card Application Brief",
        content:
            "Get step-by-step guidance on applying for, updating, or linking your PAN Card.",
        pdf: onlinePanApplicationBrief,
    },
    {
        title: "Passport",
        content:
            "Learn how to apply for a new passport, renew an old one, or get emergency travel documents.",
        pdf: passportGuide,
    },
    {
        title: "Voter Registration Guide",
        content:
            "Learn the step-by-step process to register as a voter and obtain your Voter ID.",
        pdf: voterRegistrationGuide,
    },
    {
        title: "Voter Guid",
        content:
            "Know the procedures to register for a Voter ID, update your information, or check your status.",
        pdf: voterIdGuide,
    },
    {
        title: "English Uidai Enrol Update LG",
        content:
            "Learn the process for Aadhaar enrollment and updating details with UIDAI guidelines.",
        pdf: englishUidaiEnrolUpdateLg,
    },
];

const UtilityCorner = () => {
    return (
        <div className="utility-corner-content">
            <h2 className="utility-title">
                Your one-stop repository for all essential information!
            </h2>
            <p className="utility-subtitle">
                Access step-by-step guides on obtaining government documents
                like Aadhaar, PAN Card, Passport, and other important
                certificates. Stay informed with Saarthi Newsletters, event
                reports, and press releases—all in one place.
            </p>

            <Collapse expandIconPosition="end" accordion>
                {documentData.map((doc, index) => (
                    <Panel
                        header={doc.title}
                        key={index}
                        className="custom-panel"
                    >
                        <p className="panel-content">{doc.content}</p>
                        {doc.pdf && (
                            <div className="pdf-container">
                                <iframe
                                    src={doc.pdf}
                                    title={doc.title}
                                    className="pdf-viewer"
                                />

                                <br />
                                <a
                                    href={doc.pdf}
                                    download
                                    className="download-link"
                                >
                                    Download PDF
                                </a>
                            </div>
                        )}
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default UtilityCorner;
