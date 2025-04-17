import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Avatar, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";
import logo from "../assets/logoSarthi.svg";
import useUser from "../hooks/useUser";
import "./css/profileHeader.css";

const { Header } = Layout;

const HeaderComponent = ({ headerText }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getUserDetail } = useUser();
    const accessToken = localStorage.getItem("authToken");

    const [profileData, setProfileData] = useState({
        fullName: null,
        userPicture: null,
        isAdmin: false,
    });

    useEffect(() => {
        if (
            accessToken &&
            (location.pathname != "/resource" ||
                location.pathname != "/announcement" ||
                location.pathname != "/register")
        ) {
            const fetchProfile = async () => {
                try {
                    const response = await getUserDetail();
                    if (response.data && response.data[0]) {
                        setProfileData({
                            fullName: response.data[0].full_name || null,
                            userPicture: response.data[0].user_picture || null,
                            isAdmin: response.data[0].is_admin || false,
                        });
                    }
                } catch (err) {
                    message.error("Failed to fetch profile data.", err);
                }
            };
            fetchProfile();
        }
    }, [location.pathname]);

    const handleMenuClick = ({ key }) => {
        if (key === "profile") {
            navigate("/dashboard/profile");
        }
        if (key === "admin") {
            navigate("/dashboard/admin");
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
        ...(profileData.isAdmin ? [{ key: "admin", label: "Admin" }] : []),
        {
            key: "logout",
            label: "Logout",
        },
    ];

    const hideProfileIcon =
        location.pathname === "/register" ||
        location.pathname === "/resource" ||
        location.pathname === "/announcement";

    const handleLogoClick = () => {
        if (accessToken) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "64px",
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
                    cursor: "pointer",
                }}
                onClick={handleLogoClick}
            >
                <img src={logo} style={{ height: "60px" }} alt="Logo" />
                <div className="dashboard-title">
                    {headerText || "Dashboard"}
                </div>
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
