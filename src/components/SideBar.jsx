import React, { useState } from "react";
import { Layout, Menu, Divider, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  MessageOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { mainLogo } from "../utils/imageUtils";

const { Sider } = Layout;
const { Title } = Typography;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsedState) => {
    setCollapsed(collapsedState);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      breakpoint="lg"
      width={300}
      theme="light"
    >
      <div
        className="logo"
        style={{
          padding: collapsed ? 26 : 7,
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        <img
          src={mainLogo}
          alt="Logo"
          style={{
            maxHeight: collapsed ? 40 : 80,
            transition: "all 0.3s ease",
          }}
        />
      </div>

      <Divider style={{ margin: "12px 0" }} />

      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ border: "none" }}
      >
        <Menu.ItemGroup
          title={
            !collapsed && (
              <span
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "#999",
                  fontWeight: 600,
                }}
              >
                Main Menu
              </span>
            )
          }
        >
          <Menu.Item key="1" icon={<UserOutlined style={{ fontSize: 16 }} />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined style={{ fontSize: 16 }} />}>
            Members
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<MessageOutlined style={{ fontSize: 16 }} />}
          >
            Psychologist
          </Menu.Item>
          <Menu.Item key="4" icon={<BellOutlined style={{ fontSize: 16 }} />}>
            Resource Directory
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>

      <Divider style={{ margin: "52px 0" }} />

      <Menu mode="inline" style={{ border: "none" }}>
        <Menu.ItemGroup
          title={
            !collapsed && (
              <span
                style={{
                  fontSize: "12px",
                  textTransform: "uppercase",
                  color: "#999",
                  fontWeight: 600,
                }}
              >
                Other
              </span>
            )
          }
        >
          <Menu.Item
            key="5"
            icon={<CustomerServiceOutlined style={{ fontSize: 16 }} />}
          >
            Support
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<SettingOutlined style={{ fontSize: 16 }} />}
          >
            Settings
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};

export default SideBar;
