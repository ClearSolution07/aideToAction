import React from "react";
import { Collapse } from "antd";
import "./UtilityCorner.css";

const { Panel } = Collapse;

const documentData = [
    {
        title: "Aadhaar Card",
        content:
            "Find detailed information on how to obtain, update, and manage your Aadhaar Card.",
    },
    {
        title: "PAN Card",
        content:
            "Get step-by-step guidance on applying for, updating, or linking your PAN Card.",
    },
    {
        title: "Passport",
        content:
            "Learn how to apply for a new passport, renew an old one, or get emergency travel documents.",
    },
    {
        title: "Ration Card",
        content:
            "Understand the process of getting a Ration Card and the benefits it provides.",
    },
    {
        title: "Voter Id",
        content:
            "Know the procedures to register for a Voter ID, update your information, or check your status.",
    },
];

const StudyLearnAndEarn = () => {
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
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default StudyLearnAndEarn;
