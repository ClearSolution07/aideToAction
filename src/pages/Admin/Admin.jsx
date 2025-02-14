import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Row, Col, Segmented, ConfigProvider, Button } from "antd";
import {
    UserOutlined,
    UsergroupAddOutlined,
    NotificationOutlined,
    CloudUploadOutlined,
    LeftOutlined,
} from "@ant-design/icons";

import AddPsychologist from "./AddPsychologist";
import AddMember from "./AddMember";
import AddAnnouncement from "./AddAnnouncement";
import UploadResources from "./UploadResources";

import "./admin.css";

const { Content } = Layout;

const Admin = () => {
    const navigate = useNavigate();

    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [selectedSegment, setSelectedSegment] = useState("user1");

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobileWidth(width < 768);
            setIsTabletWidth(width >= 768 && width < 1024);
            setSidebarVisible(width >= 768);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const segmentOptions = [
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <UserOutlined style={{ fontSize: "20px" }} />
                    <span>Add Psychologist</span>
                </div>
            ),
            value: "user1",
            component: AddPsychologist,
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <UsergroupAddOutlined style={{ fontSize: "20px" }} />
                    <span>Add Member</span>
                </div>
            ),
            value: "user2",
            component: AddMember,
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <NotificationOutlined style={{ fontSize: "20px" }} />
                    <span>Add Announcement</span>
                </div>
            ),
            value: "user3",
            component: AddAnnouncement,
        },
        {
            label: (
                <div
                    className={
                        isMobileWidth
                            ? "segment-item segment-item-mobile"
                            : "segment-item"
                    }
                >
                    <CloudUploadOutlined style={{ fontSize: "20px" }} />
                    <span>Upload Resources</span>
                </div>
            ),
            value: "user4",
            component: UploadResources,
        },
    ];

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Segmented: {
                            itemSelectedBg: "#fff2f0",
                            itemSelectedColor: "#fff2f0",
                        },
                    },
                }}
            >
                <Layout
                    style={{
                        transition: "margin-left 0.3s ease",
                    }}
                >
                    <Content className="content-area">
                        <Row gutter={isMobileWidth ? [12, 12] : [24, 24]}>
                            <Col span={24}>
                                <Segmented
                                    block
                                    options={segmentOptions}
                                    value={selectedSegment}
                                    onChange={(value) =>
                                        setSelectedSegment(value)
                                    }
                                    className="custom-segmented"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "center",
                                        backgroundColor:
                                            "var(--ant-component-background)",
                                        borderRadius:
                                            "var(--ant-border-radius)",
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "24px" }}>
                            <Col span={24}>
                                {React.createElement(
                                    segmentOptions.find(
                                        (option) =>
                                            option.value === selectedSegment
                                    ).component
                                )}
                            </Col>
                        </Row>
                        <Button
                            type="primary"
                            onClick={() => navigate(-1)}
                            style={{
                                marginBottom: "16px",
                                border: "none",
                                fontWeight: "bold",
                                width: "fit-content",
                            }}
                            icon={<LeftOutlined />}
                        >
                            Back
                        </Button>
                    </Content>
                </Layout>
            </ConfigProvider>
        </>
    );
};

export default Admin;
