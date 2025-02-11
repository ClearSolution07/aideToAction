import { useState, useEffect } from "react";
import { Collapse, Select, Table } from "antd";
import "./UtilityCorner.css";
import useDesktop from "../../hooks/useDesktop";

const { Panel } = Collapse;
const { Option } = Select;

const StudyLearnAndEarn = () => {
    const [selectedState, setSelectedState] = useState("All");
    const [stateData, setStateData] = useState({});
    const { getStateWiseContent } = useDesktop();

    const handleStateChange = (value) => {
        setSelectedState(value);
    };

    useEffect(() => {
        const fetchStateWiseContent = async () => {
            try {
                const response = await getStateWiseContent();
                setStateData(response.data || {}); // Store API response
            } catch (error) {
                console.error("Error fetching state-wise content:", error);
            }
        };

        fetchStateWiseContent();
    }, []);

    const renderPanels = () => {
        const states = Object.keys(stateData);

        const filteredStates =
            selectedState === "All"
                ? states
                : states.filter((state) => state === selectedState);

        return filteredStates.map((state) => {
            const { columns, dataSource } = stateData[state];

            return (
                <Panel header={state} key={state}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: "max-content" }}
                    />
                </Panel>
            );
        });
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
                    {Object.keys(stateData).map((state) => (
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

export default StudyLearnAndEarn;
