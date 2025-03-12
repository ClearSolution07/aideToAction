import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "antd/es/layout/layout";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";
import ProfileHeader from "../../components/ProfileHeader";
import "./LayoutPage.css";
import Connect from "./Connect";
import WellBeing from "./WellBeing";
import UtilityMain from "./UtilityMain";
import StudyLearnAndEarn from "./StudyLearnAndEarn";
import Announce from "./Announce";
import bgImg from "../../img/bgImg.jpeg";

const { Content } = Layout;

const DashboardContent = ({ content, setContent }) => {
    const renderContent = () => {
        switch (content) {
            case "0":
                return <Connect />;
            case "1":
                return <WellBeing />;
            case "2":
                return <UtilityMain />;
            case "3":
                return <StudyLearnAndEarn />;
            case "4":
                return <Announce />;
            default:
                return <p>Invalid content selected.</p>;
        }
    };

    return (
        <>
            <ProfileHeader onNavChange={setContent} />
            <Content>
                <div className="dynamic-content-card">{renderContent()}</div>
            </Content>
        </>
    );
};

const ProfileContent = () => (
    <Content>
        <Outlet />
    </Content>
);

const LayoutPage = () => {
    const [content, setContent] = useState("0");
    const location = useLocation();

    const isDashboardPage = location.pathname === "/dashboard";

    return (
        <Layout className="layout-container">
            <div className="background">
                {/* <div className="background-image">
                    <img src={bgImg} alt="background-img" />
                </div> */}

                <HeaderComponent
                    onMenuClick={() => {}}
                    isMobileWidth={true}
                    headerText={"Saarthi"}
                />
                {isDashboardPage ? (
                    <DashboardContent
                        content={content}
                        setContent={setContent}
                    />
                ) : (
                    <ProfileContent />
                )}
            </div>
            <Footer isAuthenticated={true} />
        </Layout>
    );
};

export default LayoutPage;
