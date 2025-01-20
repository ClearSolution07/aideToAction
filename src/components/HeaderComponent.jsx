import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Typography, Avatar, Dropdown, Button, message } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";
import useUser from "../hooks/useUser";

const { Title } = Typography;
const { Header } = Layout;

const HeaderComponent = ({ onMenuClick, isMobileWidth, headerText }) => {
    const navigate = useNavigate();
    const { getUserDetail } = useUser();
    const [profileData, setProfileData] = useState({
        fullName: null,
        userPicture: null,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserDetail();
                if (response.data && response.data[0]) {
                    setProfileData({
                        fullName: response.data[0].full_name || null,
                        userPicture: response.data[0].user_picture || null,
                    });
                }
            } catch (err) {
                message.error("Failed to fetch profile data.", err);
            }
        };

        fetchProfile();
    }, []);

    const handleMenuClick = ({ key }) => {
        if (key === "profile") {
            navigate("/saarthi/profile");
        } else if (key === "logout") {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
            message.success("Logged out successfully.");
            navigate("/");
        }
    };

    const menuItems = [
        {
            key: "profile",
            label: "Profile",
        },
        {
            key: "logout",
            label: "Logout",
        },
    ];

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "64px",
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                }}
            >
                {isMobileWidth && (
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={onMenuClick}
                        style={{
                            fontSize: "18px",
                            padding: 0,
                        }}
                    />
                )}
                {!isMobileWidth && (
                    <Title
                        level={2}
                        style={{
                            paddingLeft: 16,
                        }}
                    >
                        {headerText || "Dashboard"}
                    </Title>
                )}
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                }}
            >
                <Dropdown
                    menu={{ items: menuItems, onClick: handleMenuClick }}
                    trigger={["click"]}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            gap: 8,
                        }}
                    >
                        <Avatar
                            size={32}
                            src={profileData.userPicture || profilePhoto}
                            alt="User Avatar"
                        />
                        {!isMobileWidth && profileData.fullName && (
                            <>
                                <span style={{ color: "#333" }}>
                                    {profileData.fullName}
                                </span>
                                <DownOutlined
                                    style={{ fontSize: 12, color: "#666" }}
                                />
                            </>
                        )}
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderComponent;
