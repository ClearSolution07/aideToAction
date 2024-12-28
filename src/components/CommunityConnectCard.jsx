import React from "react";
import { Card, Button, Typography, Row } from "antd";

const { Title, Text } = Typography;

const CommunityConnectCard = () => {
  return (
    <Card
      style={{
        backgroundColor: "#1a1a4a",
        color: "#fff",
        borderRadius: 10,
        padding: "20px",
      }}
      bordered={false}
    >
      <Title level={5} style={{ color: "#fff", marginBottom: "40px" }}>
        Community Connect
      </Title>
      <Title
        level={4}
        style={{ color: "#fff", marginBottom: "8px", fontWeight: 600 }}
      >
        Chat with Members and Psychologists
      </Title>
      <Text
        style={{ color: "#d1d1e1", marginBottom: "40px", display: "block" }}
      >
        Kindly note that, chats will disappear every 3-days
      </Text>
      <Row display="flex" justify="space-between">
        <Text
          style={{
            color: "#d1d1e1",
            marginBottom: "16px",
            display: "block",
          }}
        >
          Click to Start interacting now
        </Text>
        <Button
          type="primary"
          style={{
            padding: "0 20px",
          }}
          size="large"
        >
          Chat Now
        </Button>
      </Row>
    </Card>
  );
};

export default CommunityConnectCard;
