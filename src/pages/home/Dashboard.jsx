import React, {useEffect, useState} from "react";
import {Layout, Card, List, Col, Row, Button, Typography} from "antd";
import "./dashboard.css";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/Sidebar";
import StatusCard from "../../components/StatusCard";
import {dataStatus} from "../../utils/dataStatus";
import PsychologistCard from "../../components/PsychologistCard";
import CommunityConnectCard from "../../components/CommunityConnectCard";
import AnnouncementCard from "../../components/AnnouncementCard";

const {Content} = Layout;
const {Title, Text, Link} = Typography;

const Dashboard = () => {
    const [is_mobile_width, set_is_mobile_width] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const width = document.body.clientWidth;
        if (width < 1024) {
            set_is_mobile_width(true);
        } else {
            set_is_mobile_width(false);
        }
    }, []);

    return (
        <Layout style={{minHeight: "100vh"}}>
            <SideBar/>

            <Layout>
                <HeaderComponent/>

                <Content style={{margin: "16px"}}>
                    <Row gutter={[16, 16]} style={{marginTop: 16}}>
                        <Col
                            xs={24}
                            sm={16}
                            style={{display: "flex", flexDirection: "column", gap: "20px"}}
                        >
                            <Row xs={24} sm={8} style={{display: "flex", gap: "20px" , flexDirection: is_mobile_width ? 'column': 'row'}}>
                                {dataStatus?.map((i, key) => (
                                    <StatusCard
                                        name={i.name}
                                        count={i.count}
                                        text={i.text}
                                        color={i.color}
                                        linkColor={i.linkColor}
                                        key={i}
                                    />
                                ))}
                            </Row>
                            <Row xs={24} sm={8} style={{
                                maxHeight: 600,
                                overflowY: "scroll",
                            }}>
                                <AnnouncementCard/>
                            </Row>
                        </Col>

                        <Col
                            xs={24}
                            sm={8}
                            style={{display: "flex", flexDirection: "column", gap: "24px"}}
                        >
                            <CommunityConnectCard/>
                            <PsychologistCard/>
                        </Col>
                    </Row>
                </Content>

                {/*<FooterComponent/>*/}
            </Layout>
        </Layout>
    );
};

export default Dashboard;
