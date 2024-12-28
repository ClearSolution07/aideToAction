import React from "react";
import { Layout, Card, List, Col, Row, Button, Typography } from "antd";
import "./dashboard.css";
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/Sidebar";
import StatusCard from "../../components/StatusCard";
import { dataStatus } from "../../utils/dataStatus";
import PsychologistCard from "../../components/PsychologistCard";
import CommunityConnectCard from "../../components/CommunityConnectCard";
import AnnouncementCard from "../../components/AnnouncementCard";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />

      <Layout>
        <HeaderComponent />

        <Content style={{ margin: "16px" }}>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col
              xs={24}
              sm={16}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Row xs={24} sm={8} style={{ display: "flex", gap: "20px" }}>
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
              <Row xs={24} sm={8}>
                <AnnouncementCard />
              </Row>
            </Col>

            <Col
              xs={24}
              sm={8}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <CommunityConnectCard />
              <PsychologistCard />
            </Col>
          </Row>
        </Content>

        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
