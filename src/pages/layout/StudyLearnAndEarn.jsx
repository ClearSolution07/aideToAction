import { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useDesktop from "../../hooks/useDesktop";
import "./UtilityCorner.css";

const isLink = (str) => {
    if (typeof str !== "string") return false;
    const domainExtensions = [".com", ".in", ".org", ".net", ".gov", ".edu"];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
        str.startsWith("https://") ||
        str.startsWith("http://") ||
        domainExtensions.some((ext) => str.endsWith(ext)) ||
        emailRegex.test(str)
    );
};

const formatLink = (str) => {
    if (typeof str !== "string") return "#";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(str)) {
        return `mailto:${str}`;
    }
    if (!str.startsWith("http://") && !str.startsWith("https://")) {
        return `https://${str}`;
    }
    return str;
};

const StudyLearnAndEarn = () => {
    const [stateData, setStateData] = useState({ columns: [], dataSource: [] });
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const { getStateWiseContent } = useDesktop();

    useEffect(() => {
        const fetchStateWiseContent = async () => {
            try {
                const response = await getStateWiseContent();
                setStateData(response.data || { columns: [], dataSource: [] });
            } catch (error) {
                console.error("Error fetching state-wise content:", error);
                setStateData({ columns: [], dataSource: [] });
            }
        };
        fetchStateWiseContent();
    }, []);

    const handleTableChange = (pagination) => {
        setPageSize(pagination.pageSize);
    };

    const handleGlobalSearch = (e) => {
        setSearchText(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchText("");
    };

    const highlightText = (text) => {
        if (!searchText) return text;
        const regex = new RegExp(`(${searchText})`, "gi");
        return text
            ?.toString()
            .replace(
                regex,
                (match) => `<span class="highlight">${match}</span>`
            );
    };

    const renderPanels = () => {
        let { columns, dataSource } = stateData;
        if (!Array.isArray(columns) || !Array.isArray(dataSource)) return null;

        if (columns.length > 0) {
            columns = [...columns];
            columns[0] = { ...columns[0]};
            if (columns.length > 1) {
                columns[1] = { ...columns[1]};
            }
        }

        const updatedColumns = columns.map((col) => ({
            ...col,
            render: (text) => {
                if (isLink(text)) {
                    return (
                        <a
                            href={formatLink(text)}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {text}
                        </a>
                    );
                }
                return (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: highlightText(text),
                        }}
                    />
                );
            },
        }));

        const filteredDataSource = dataSource.filter((dataItem) =>
            Object.values(dataItem).some((value) =>
                value
                    ?.toString()
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            )
        );

        return (
            <>
                <div
                    style={{
                        marginBottom: 16,
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Input
                        placeholder="Search all columns"
                        value={searchText}
                        onChange={handleGlobalSearch}
                        style={{ width: 320 }}
                        prefix={
                            <SearchOutlined
                                style={{ color: "#1890ff", marginRight: 4 }}
                            />
                        }
                    />
                    <Button
                        onClick={handleClearSearch}
                        style={{ marginLeft: 8, background: "#ffeee8" }}
                    >
                        Clear
                    </Button>
                </div>
                <Table
                    columns={updatedColumns}
                    dataSource={filteredDataSource}
                    pagination={{ pageSize }}
                    onChange={handleTableChange}
                    scroll={{ x: "max-content" }}
                    style={{ background: "transparent" }}
                />
            </>
        );
    };

    return (
        <div className="utility-corner-content">
            <h1 className="utility-title">State-wise Resources</h1>
            <p className="utility-subtitle">
                Names of organizations, institutes, and agencies providing
                support in education, skill development, housing, and job
                placements. Search by the name of the state.
            </p>
            <div>{renderPanels()}</div>
        </div>
    );
};

export default StudyLearnAndEarn;
