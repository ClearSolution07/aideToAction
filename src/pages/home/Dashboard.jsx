import React from "react";
import { Layout, Menu, Card, List, Col, Row, Button, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import "./dashboard.css"; // Assuming custom styles for refinement
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/Sidebar";
import StatusCard from "../../components/StatusCard";
import { dataStatus } from "../../utils/dataStatus";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

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
              <Row
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {dataStatus?.map((i, key) => (
                  <StatusCard
                    name={i.name}
                    count={i.count}
                    text={i.text}
                    key={i}
                  />
                ))}
              </Row>
              <Row xs={24} sm={8}>
                <Card title="Announcement" style={{ width: "100%" }}>
                  <List
                    dataSource={[
                      "Outing schedule for every department",
                      "Meeting HR Department",
                      "IT Department needs two more talents for UX/UI Designer position",
                    ]}
                    renderItem={(item) => <List.Item>{item}</List.Item>}
                  />
                </Card>
              </Row>
            </Col>

            <Col xs={24} sm={8}>
              <Card
                title="Community Connect"
                style={{ backgroundColor: "#f0f2f5" }}
              >
                <Text>Chat with Members and Psychologists</Text>
                <Button type="primary" block style={{ marginTop: 16 }}>
                  Chat Now
                </Button>
              </Card>

              <Card title="Psychologists Available" style={{ marginTop: 16 }}>
                <List
                  dataSource={["Dr. Abcdef", "Dr. Abcdef", "Dr. Abcdef"]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                <Button type="link" block style={{ marginTop: 16 }}>
                  See More Psychologists
                </Button>
              </Card>
            </Col>
          </Row>
        </Content>

        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
