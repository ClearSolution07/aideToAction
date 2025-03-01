import React, { useState, useRef, useEffect } from "react";
import { Table, Input, Button, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import useDesktop from "../../hooks/useDesktop";
import "./UtilityCorner.css";

const { Option } = Select;

const StudyLearnAndEarn = () => {
    const [stateData, setStateData] = useState({ columns: [], dataSource: [] });
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
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

    // Handle pagination & page size change
    const handleTableChange = (pagination) => {
        setPageSize(pagination.pageSize);
    };

    // Search filter functions
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, setSelectedKeys) => {
        clearFilters(); 
        setSelectedKeys([]); 
        setSearchText("");
    };

    // Search filter configuration for columns (excluding 's_no')
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] || ""}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            handleReset(clearFilters, setSelectedKeys)
                        }
                        size="small"
                    >
                        Reset
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#ff6f5c" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        render: (text) => {
            if (!searchText || searchedColumn !== dataIndex) return text;
            const regex = new RegExp(`(${searchText})`, "gi");
            return (
                <span>
                    {text?.split(regex).map((part, index) =>
                        part.toLowerCase() === searchText.toLowerCase() ? (
                            <mark
                                key={index}
                                style={{
                                    backgroundColor: "#ffc069",
                                    padding: 0,
                                }}
                            >
                                {part}
                            </mark>
                        ) : (
                            part
                        )
                    )}
                </span>
            );
        },
    });

    const renderPanels = () => {
        let { columns, dataSource } = stateData;

        if (!Array.isArray(columns) || !Array.isArray(dataSource)) return null;

        // Modify columns
        if (columns.length > 0) {
            columns = [...columns];
            columns[0] = { ...columns[0], fixed: "left" };
            if (columns.length > 1) {
                columns[1] = { ...columns[1], fixed: "left" };
            }
        }

        // Apply search filters to columns (excluding 's_no')
        columns = columns.map((col) =>
            col.dataIndex !== "s_no"
                ? { ...col, ...getColumnSearchProps(col.dataIndex) }
                : col
        );

        // Modify data source for links
        const updatedDataSource = dataSource.map((dataItem) => {
            const updatedItem = { ...dataItem };
            columns.forEach((col) => {
                if (
                    col.dataIndex &&
                    typeof updatedItem[col.dataIndex] === "string" &&
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
            <>
                {/* Table Component */}
                <Table
                    columns={columns}
                    dataSource={updatedDataSource}
                    pagination={{ pageSize }}
                    onChange={handleTableChange}
                    scroll={{ x: "max-content" }}
                    style={{ background: "transparent" }}
                />
            </>
        );
    };

    // Helper function to check if value is a link
    const isLink = (str) => {
        if (typeof str !== "string") return false;
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

    // Helper function to format links
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

    return (
        <div className="utility-corner-content">
            <h2 className="utility-title">State-wise Resources</h2>
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
