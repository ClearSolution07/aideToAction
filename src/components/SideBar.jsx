import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { mainLogo } from "../utils/imageUtils";

const { Sider } = Layout;

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
      width={400}
      theme="light"
    >
      <div
        className="logo"
        style={{
          padding: 16,
          textAlign: "center",
          transition: "all 0.3s ease",
        }}
      >
        <img
          src={mainLogo}
          alt="Logo"
          style={{
            maxHeight: collapsed ? 50 : 100,
            maxWidth: "100%",
            transition: "all 0.3s ease",
          }}
        />
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="2" icon={<TeamOutlined />}>
          Members
        </Menu.Item>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          Psychologist
        </Menu.Item>
        <Menu.Item key="4" icon={<BellOutlined />}>
          Resource Directory
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
