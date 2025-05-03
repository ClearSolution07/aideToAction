import React from "react";
import { ChevronDown } from "lucide-react";
import "./Announce.css";
import AnnouncementCard from "../../components/AnnouncementCard";
import HeaderComponent from "../../components/HeaderComponent";
import Footer from "../../components/FooterComponent";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Announce = () => {
    const navigate = useNavigate();
    return (
        <div>
            <HeaderComponent headerText={"Announcement"} />
            <div className="announces-container">
                <h1 className="announces-title">
                    Stay informed about the latest events
                </h1>
                <p className="announces-subtitle">
                    This section brings you notifications about upcoming
                    programs, training opportunities, resource additions, and
                    community initiatives.
                </p>
                <AnnouncementCard />

                <div className="down-arrow">
                    <ChevronDown size={32} />
                </div>
            </div>
            <Button
                type="primary"
                icon={<LeftOutlined />}
                style={{
                    border: "none",
                    marging: "5px",
                    fontWeight: "bold",
                    margin: "28px",
                    marginBottom: "16px",

                    // padding: "5px 15px",
                }}
                onClick={() => navigate("/")}
            >
                Home
            </Button>

            <Footer isAuthenticated={true} />
        </div>
    );
};

export default Announce;
