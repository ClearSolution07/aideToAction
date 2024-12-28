import React from "react";
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
  return (
    <Sider collapsible breakpoint="lg" width={260} theme="light">
      <div className="logo" style={{ padding: 16, textAlign: "center" }}>
        <img src={mainLogo} alt="Logo" style={{ maxHeight: 100 }} />
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
