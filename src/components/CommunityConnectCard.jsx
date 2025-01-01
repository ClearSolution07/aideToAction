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
      }}
      bordered={false}
    >
      <Text
        level={4}
        style={{
          color: "#fff",
          marginBottom: "20px",
          fontSize: 24,
          fontWeight: 500,
        }}
      >
        Community Connect
      </Text>
      <Title level={5} style={{ color: "#fff", fontWeight: 500 }}>
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
