import React, { useState } from "react";
import { Card, List, Avatar, Typography, Button } from "antd";
import { profilePhoto } from "../utils/imageUtils";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const psychologists = [
  {
    name: "Dr. Abcdef",
    qualification: "MBBS, GMC",
    profilePhoto: "https://via.placeholder.com/48",
  },
  {
    name: "Dr. Ghijkl",
    qualification: "MBBS, GMC",
    profilePhoto: "https://via.placeholder.com/48",
  },
  {
    name: "Dr. Mnopqr",
    qualification: "MBBS, GMC",
    profilePhoto: "https://via.placeholder.com/48",
  },
  {
    name: "Dr. Xyzabc",
    qualification: "MBBS, GMC",
    profilePhoto: "https://via.placeholder.com/48",
  },
  {
    name: "Dr. Defghi",
    qualification: "MBBS, GMC",
    profilePhoto: "https://via.placeholder.com/48",
  },
];

const PsychologistCard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 16,
      }}
    >
      {/* Fixed Title at the Top */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <Title level={4} style={{ margin: 0 }}>
          Psychologist Available
        </Title>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={psychologists.slice(0, expanded ? psychologists.length : 3)} // Show all or only 3 psychologists
        renderItem={(item) => (
          <List.Item
            style={{
              borderRadius: 8,
              marginBottom: 8,
              border: "1px solid #f0f0f0",
              padding: 8,
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={profilePhoto}
                  size={48}
                  style={{ border: "1px solid #f0f0f0" }}
                />
              }
              title={<Text style={{ fontWeight: 500 }}>{item.name}</Text>}
              description={<Text type="secondary">{item.qualification}</Text>}
            />
          </List.Item>
        )}
      />

      <hr
        style={{
          border: "1px solid #f0f0f0",
          margin: "16px 0",
        }}
      />

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Button
          type="link"
          onClick={handleToggle}
          style={{
            color: "red",
            fontWeight: 600,
            textDecoration: "none",
            padding: 0,
          }}
        >
          {expanded ? (
            <>
              <UpOutlined /> &nbsp; See Less Psychologist
            </>
          ) : (
            <>
              <DownOutlined />
              &nbsp; See More Psychologist
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default PsychologistCard;
