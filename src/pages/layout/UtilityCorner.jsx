import React, { useState } from "react";
import { Collapse, Select } from "antd";
import "./UtilityCorner.css";

const { Panel } = Collapse;
const { Option } = Select;

const stateList = [
    "Assam",
    "Arunachal Pradesh",
    "Manipur",
    "Nagaland",
    "Sikkim",
    "West Bengal",
    "Bihar",
    "Mizoram",
    "Tripura",
    "Meghalaya",
    "Uttar Pradesh",
];

const stateResources = {
    Assam: ["Organization A", "Institute B", "Agency C"],
    "Arunachal Pradesh": ["Support Agency X", "Learning Center Y"],
    Manipur: ["Employment Group Z"],
    Nagaland: ["Job Training Hub 1"],
    Sikkim: ["Educational Aid 3", "Career Coach"],
    "West Bengal": ["Vocational Center"],
    Bihar: ["Resource Center B"],
    Mizoram: ["Housing Help"],
    Tripura: ["Development Aid"],
    Meghalaya: ["Training Group"],
    "Uttar Pradesh": ["Skill Development Agency"],
};

const UtilityCorner = () => {
    const [selectedState, setSelectedState] = useState("All");

    const handleStateChange = (value) => {
        setSelectedState(value);
    };

    const renderPanels = () => {
        const filteredStates =
            selectedState === "All"
                ? stateList
                : stateList.filter((state) => state === selectedState);

        return filteredStates.map((state) => (
            <Panel header={state} key={state}>
                <ul>
                    {stateResources[state]?.map((resource, index) => (
                        <li key={index}>{resource}</li>
                    )) || <li>No resources available.</li>}
                </ul>
            </Panel>
        ));
    };

    return (
        <div className="utility-corner-content">
            <h2 className="utility-title">State-wise Resources</h2>
            <p className="utility-subtitle">
                Names of organizations, institutes, and agencies providing
                support in education, skill development, housing, and job
                placements. Search by the name of the state.
            </p>

            <div className="state-filter">
                <Select
                    value={selectedState}
                    onChange={handleStateChange}
                    style={{ width: 300 }}
                    className="state-select"
                >
                    <Option value="All">All States</Option>
                    {stateList.map((state) => (
                        <Option key={state} value={state}>
                            {state}
                        </Option>
                    ))}
                </Select>
            </div>

            <Collapse expandIconPosition="end" accordion>
                {renderPanels()}
            </Collapse>
        </div>
    );
};

export default UtilityCorner;
