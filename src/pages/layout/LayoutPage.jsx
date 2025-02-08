import { useState } from "react";
import SideBar from "../../components/SideBar";
import Layout from "antd/es/layout/layout";

import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";

const { Content } = Layout;

const LayoutPage = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <Layout>
            <SideBar
                visible={sidebarVisible}
                tabletVisible={false}
                onClose={() => setSidebarVisible(false)}
                isMobileWidth={true}
            />

            <Layout
                style={{
                    marginLeft: 0,
                    transition: "margin-left 0.3s ease",
                    minHeight: "100vh",
                }}
            >
                <HeaderComponent
                    onMenuClick={toggleSidebar}
                    isMobileWidth={true}
                    headerText={"Chat Window"}
                />
                <Content>
                    <Outlet />
                </Content>
                <Footer isAuthenticated={true} />
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
