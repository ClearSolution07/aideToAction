import React from "react";
import { Card, List, Avatar, Typography } from "antd";
import { profilePhoto } from "../utils/imageUtils";

const { Title, Text } = Typography;

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
        width: "100%",
        height: `calc(90vh - 290px)`,
      }}
      styles={{
        body: {
          padding: 0,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        },
      }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Title level={3} style={{ margin: "0" }}>
          Psychologist Available
        </Title>
      </div>
      <div
        style={{
          overflowY: "auto",
          flexGrow: 1,
          padding: "16px",
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[...psychologists, ...psychologists, ...psychologists]}
          renderItem={(item) => (
            <List.Item
              style={{
                borderRadius: 8,
                marginBottom: 8,
                border: "1px solid #f0f0f0",
                backgroundColor: "#FAFAFA",
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
                title={<Text strong>{item.name}</Text>}
                description={<Text type="secondary">{item.qualification}</Text>}
              />
            </List.Item>
          )}
        />
      </div>
    </Card>
  );
};

export default PsychologistCard;
