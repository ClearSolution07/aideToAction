import React from "react";
import { Layout, Typography } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
const { Title } = Typography;

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ maxWidth: 400, width: "100%" }}>
        <Title>Dashboard</Title>
      </div>
      <div>
        <BellOutlined style={{ fontSize: 20, marginRight: 16 }} />
        <UserOutlined style={{ fontSize: 20 }} />
      </div>
    </Header>
  );
};

export default HeaderComponent;
