import React from "react";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { memberProfile } from "../utils/imageUtils";
import "./css/ProfileHeader.css";

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="profile-image-container">
              <img
                src={memberProfile}
                alt="Kevin Gilbert"
                className="profile-image"
              />
            </div>
            <div>
              <h2 className="profile-name">Kevin Gilbert</h2>
              <p className="profile-role">
                Web Designer & Best-Selling Instructor
              </p>
            </div>
          </div>
          <Button type="text" className="member-button">
            Member <ArrowRightOutlined className="arrow-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
