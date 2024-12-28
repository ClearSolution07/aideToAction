import { Card, Typography, Button } from "antd";

const { Title, Text } = Typography;

const StatusCard = ({ name, count, text }) => {
  return (
    <Card style={{width:"400px"}}>
      <Title level={4}>{name}</Title>
      <Text>{count}</Text>
      <Button type="link">{text}</Button>
    </Card>
  );
};

export default StatusCard;
