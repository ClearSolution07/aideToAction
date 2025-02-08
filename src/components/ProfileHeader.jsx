import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import {
    ArrowRightOutlined,
    MessageOutlined,
    HeartOutlined,
    ToolOutlined,
    BookOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";
import "./css/ProfileHeader.css";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ onNavChange }) => {
    const navigate = useNavigate();
    const { getUserDetail } = useUser();

    const [profileData, setProfileData] = useState({
        fullName: "",
        image: "",
        description: "",
    });

    const [activeNav, setActiveNav] = useState(0);
    const navRefs = useRef([]);
    const sliderRef = useRef(null);

    const navItems = [
        {
            icon: <MessageOutlined />,
            label: "Let's Connect!",
            content: "0",
        },
        {
            icon: <HeartOutlined />,
            label: "Wellbeing Matters!",
            content: "1",
        },
        {
            icon: <ToolOutlined />,
            label: "Utility Corner",
            content: "2",
        },
        {
            icon: <BookOutlined />,
            label: "Study, Learn and Earn!",
            content: "3",
        },
        {
            icon: <NotificationOutlined />,
            label: "Announcements!",
            content: "4",
        },
    ];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserDetail();
                setProfileData({
                    fullName: response.data[0].full_name || "",
                    image: response.data[0].user_picture || "",
                    description: response.data[0].description || "",
                });
            } catch (err) {
                console.error("Failed to fetch profile data.", err);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (navRefs.current[activeNav]) {
            const initialNavItem = navRefs.current[activeNav];
            sliderRef.current.style.width = `${initialNavItem.offsetWidth}px`;
            sliderRef.current.style.left = `${initialNavItem.offsetLeft}px`;
        }
    }, [activeNav]);

    const handleNavClick = (index) => {
        setActiveNav(index);
        onNavChange(navItems[index].content);

        if (navRefs.current[index]) {
            const navItem = navRefs.current[index];
            sliderRef.current.style.width = `${navItem.offsetWidth}px`;
            sliderRef.current.style.left = `${navItem.offsetLeft}px`;
        }
    };

    return (
        <div className="profile-header">
            <div className="profile-header-content">
                <div className="profile-card">
                    <div className="profile-info">
                        <div className="profile-image-container">
                            <img
                                src={profileData.image || profilePhoto}
                                alt={profileData.fullName}
                                className="profile-image"
                            />
                        </div>
                        <div>
                            <h2 className="profile-name">
                                {profileData.fullName}
                            </h2>
                            <p className="profile-role">
                                {profileData.description}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="text"
                        className="member-button"
                        onClick={() => {
                            navigate("/saarthi/chat");
                        }}
                    >
                        Chat Now <ArrowRightOutlined className="arrow-icon" />
                    </Button>
                </div>

                {/* Navigation Section */}
                <div className="navigation-section">
                    {navItems.map((item, index) => (
                        <Button
                            key={index}
                            type="text"
                            ref={(el) => (navRefs.current[index] = el)}
                            className={`nav-link ${
                                activeNav === index ? "active" : ""
                            }`}
                            onClick={() => handleNavClick(index)}
                        >
                            {item.icon} {item.label}
                        </Button>
                    ))}
                    <div className="slider" ref={sliderRef} />
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
