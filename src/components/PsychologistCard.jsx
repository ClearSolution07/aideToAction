import React from "react";
import { Card, List, Avatar, Typography } from "antd";
import { profilePhoto } from "../utils/imageUtils";

const { Title, Text, Link } = Typography;

// Sample data for psychologists
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
];

const PsychologistCard = () => {
  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 16,
      }}
    >
      <Title level={4} style={{ textAlign: "center", marginBottom: 28 }}>
        Psychologist Available
      </Title>

      <List
        itemLayout="horizontal"
        dataSource={[...psychologists, ...psychologists.splice(1)]}
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

      <div
        style={{
          textAlign: "center",
          marginTop: 40,
        }}
      >
        <Link
          href="#"
          style={{
            color: "red",
            fontWeight: 600,
            textDecoration: "none",
            marignTop: "5px",
          }}
        >
          See More Psychologist
        </Link>
      </div>
    </Card>
  );
};

export default PsychologistCard;
