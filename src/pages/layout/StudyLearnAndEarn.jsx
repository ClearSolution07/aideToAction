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
                setStateData(response.data || {});
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
            let { columns, dataSource } = stateData[state];

            if (columns.length > 0) {
                columns[0] = { ...columns[0], fixed: "left" };
            }

            const updatedDataSource = dataSource.map((dataItem) => {
                const updatedItem = { ...dataItem };
                columns.forEach((col) => {
                    if (
                        col.dataIndex &&
                        updatedItem[col.dataIndex] &&
                        isLink(updatedItem[col.dataIndex])
                    ) {
                        const link = formatLink(updatedItem[col.dataIndex]);
                        updatedItem[col.dataIndex] = (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {updatedItem[col.dataIndex]}
                            </a>
                        );
                    }
                });
                return updatedItem;
            });

            return (
                <Panel header={state} key={state}>
                    <Table
                        columns={columns}
                        dataSource={updatedDataSource}
                        pagination={{
                            pageSize: 10,
                        }}
                        scroll={{ x: "max-content" }}
                        style={{ background: "transparent" }}
                    />
                </Panel>
            );
        });
    };

    const isLink = (str) => {
        const domainExtensions = [
            ".com",
            ".in",
            ".org",
            ".net",
            ".gov",
            ".edu",
        ];
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return (
            str.startsWith("https://") ||
            str.startsWith("http://") ||
            domainExtensions.some((ext) => str.endsWith(ext)) ||
            emailRegex.test(str)
        );
    };

    const formatLink = (str) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(str)) {
            return `mailto:${str}`;
        }
        if (!str.startsWith("http://") && !str.startsWith("https://")) {
            return `https://${str}`;
        }

        return str;
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
