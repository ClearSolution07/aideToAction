import { useState } from "react";
import Layout from "antd/es/layout/layout";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";
import ProfileHeader from "../../components/ProfileHeader";
import "./LayoutPage.css";
import Connect from "./Connect";
import WellBeing from "./WellBeing";
import UtilityCorner from "./UtilityCorner";
import StudyLearnAndEarn from "./StudyLearnAndEarn";
import Announce from "./Announce";

const { Content } = Layout;

const LayoutPage = () => {
    const [content, setContent] = useState("0");

    const renderContent = () => {
        switch (content) {
            case "0":
                return <Connect />;
            case "1":
                return <WellBeing />;
            case "2":
                return <UtilityCorner />;
            case "3":
                return <StudyLearnAndEarn />;
            case "4":
                return <Announce />;
            default:
                return <p>Invalid content selected.</p>;
        }
    };

    return (
        <Layout
            style={{
                marginLeft: 0,
                transition: "margin-left 0.3s ease",
                minHeight: "100vh",
            }}
        >
            <HeaderComponent
                onMenuClick={() => {}}
                isMobileWidth={true}
                headerText={"Saarthi"}
            />
            <ProfileHeader onNavChange={setContent} />
            <Content>
                <div className="dynamic-content-card">{renderContent()}</div>
            </Content>
            <Footer isAuthenticated={true} />
        </Layout>
    );
};

export default LayoutPage;
