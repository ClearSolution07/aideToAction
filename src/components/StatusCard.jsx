import { Card, Typography } from "antd";

const { Title, Link } = Typography;

const StatusCard = ({ name, count, text, color, linkColor }) => {
  return (
    <Card style={{ borderRadius: "16px", backgroundColor: color, flex: 1 }}>
      <Title level={3}>{name}</Title>
      <Title>{count}</Title>
      <Link style={{ color: linkColor, fontWeight: "1200" }}>{text}</Link>
    </Card>
  );
};

export default StatusCard;
