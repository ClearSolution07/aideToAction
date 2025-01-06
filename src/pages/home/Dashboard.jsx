import { useEffect, useState } from "react";
import { Layout, Row, Col } from "antd";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/SideBar";
import StatusCard from "../../components/StatusCard";
import { dataStatus } from "../../utils/dataStatus";
import PsychologistCard from "../../components/PsychologistCard";
import CommunityConnectCard from "../../components/CommunityConnectCard";
import AnnouncementCard from "../../components/AnnouncementCard";

const { Content } = Layout;

const Dashboard = () => {
    const [isMobileWidth, setIsMobileWidth] = useState(false);
    const [isTabletWidth, setIsTabletWidth] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);

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

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    function checkMargin() {
        if (isMobileWidth) return 0;
        if (sidebarVisible && isTabletWidth) {
            return 80;
        }
        return 240;
    }

    return (
        <Layout>
            <SideBar
                visible={sidebarVisible}
                tabletVisible={isTabletWidth}
                onClose={() => setSidebarVisible(false)}
                isMobileWidth={isMobileWidth}
            />
            <Layout
                style={{
                    marginLeft: checkMargin(),
                    transition: "margin-left 0.3s ease",
                    minHeight: "100vh",
                }}
            >
                <HeaderComponent
                    onMenuClick={toggleSidebar}
                    isMobileWidth={isMobileWidth}
                />
                <Content
                    style={{ padding: "24px", backgroundColor: "#f5f5f5" }}
                >
                    <Row gutter={isMobileWidth ? [12, 12] : [24, 24]}>
                        {/* Main Content Area: Left section with status cards */}
                        <Col xs={24} lg={16}>
                            <Row gutter={[24, 24]}>
                                {dataStatus?.map((item, index) => (
                                    <Col
                                        xs={24}
                                        md={24}
                                        sm={24}
                                        lg={8}
                                        xl={8}
                                        key={index}
                                    >
                                        <StatusCard {...item} />
                                    </Col>
                                ))}
                            </Row>
                            <Row style={{ marginTop: 24 }}>
                                <Col span={24}>
                                    <AnnouncementCard visible={isMobileWidth} />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={24} lg={8}>
                            <Row gutter={[0, 24]}>
                                <Col span={24}>
                                    <CommunityConnectCard />
                                </Col>
                                <Col span={24}>
                                    <PsychologistCard />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
