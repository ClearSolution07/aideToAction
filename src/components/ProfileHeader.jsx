import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { profilePhoto } from "../utils/imageUtils";
import "./css/ProfileHeader.css";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const { getUserDetail } = useUser();

  const [profileData, setProfileData] = useState({
    fullName: "",
    image: "",
    description: "",
  });
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
        message.error("Failed to fetch profile data.", err);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-image-container">
              <img
                src={profileData.image || profilePhoto}
                alt="Kevin Gilbert"
                className="profile-image"
              />
            </div>
            <div>
              <h2 className="profile-name">{profileData.fullName}</h2>
              <p className="profile-role">{profileData.description}</p>
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
      </div>
    </div>
  );
};

export default ProfileHeader;
