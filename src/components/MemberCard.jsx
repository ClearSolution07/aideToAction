import React from "react";
import { Button } from "antd";
import { StarFilled, SendOutlined } from "@ant-design/icons";
import { memberProfile } from "../utils/imageUtils";
import "./css/memberCard.css";

const MemberCard = ({ name, role, rating, students, imageUrl }) => {
  return (
    <div className="member-card">
      <div className="member-card-content">
        <div className="member-image-container">
          <img src={memberProfile} alt={name} className="member-image" />
        </div>
        <div className="member-info">
          <h3 className="member-name">{name}</h3>
          <p className="member-role">{role}</p>
        </div>
        <div className="member-stats">
          <div className="rating">
            <StarFilled className="star-icon" />
            <span className="rating-value">{rating.toFixed(1)}</span>
          </div>
          <div className="students">
            <span className="student-count">{students.toLocaleString()}</span>
            <span className="student-label">students</span>
          </div>
        </div>
        <Button
          type="text"
          icon={<SendOutlined />}
          className="send-message-button"
        >
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default MemberCard;
