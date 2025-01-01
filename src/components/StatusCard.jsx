import { Card, Typography } from "antd";

const { Title, Link, Text } = Typography;

const StatusCard = ({ name, count, text, color, linkColor }) => {
  return (
    <Card
      style={{
        borderRadius: "16px",
        backgroundColor: color,
        flex: 1,
        maxHeight: 150,
        minHeight: 150,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontWeight: "bold",
        }}
      >
        <Text type="primary" style={{ fontSize: "24px", fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ fontSize: "24px" }}>{count}</Text>
        <Link style={{ color: linkColor }}>{text}</Link>
      </div>
    </Card>
  );
};

export default StatusCard;
