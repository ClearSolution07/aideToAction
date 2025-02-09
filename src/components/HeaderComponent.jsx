import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Typography, Avatar, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";
import logo from "../assets/mainLogo.svg";
import useUser from "../hooks/useUser";

const { Title } = Typography;
const { Header } = Layout;

const HeaderComponent = ({ headerText }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUserDetail } = useUser();

    const [profileData, setProfileData] = useState({
        fullName: null,
        userPicture: null,
    });

    const isLoggedIn = !!(
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );

    useEffect(() => {
        if (isLoggedIn) {
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
        }
    }, [isLoggedIn]);

    const handleMenuClick = ({ key }) => {
        if (key === "profile") {
            navigate("/dashboard/profile");
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

    const hideProfileIcon = location.pathname === "/register" || !isLoggedIn;

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
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
                <img src={logo} style={{ height: "60px" }} />
                <Title
                    level={2}
                    style={{
                        paddingLeft: 16,
                        margin: 0,
                    }}
                >
                    {headerText || "Dashboard"}
                </Title>
            </div>

            {!hideProfileIcon && (
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
                            {profileData.fullName && (
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
            )}
        </Header>
    );
};

export default HeaderComponent;
