import { Card, Typography } from "antd";
import "./css/statusCard.css";

const { Link, Text } = Typography;

const StatusCard = ({ name, count, text, color, linkColor }) => {
    return (
        <Card
            style={{
                backgroundColor: color,
            }}
            className={"cardContainer"}
        >
            <div className="cardDiv">
                <Text type="primary" className="firstText">
                    {name}
                </Text>
                <Text className="secondText">{count}</Text>
                <Link style={{ color: linkColor }}>{text}</Link>
            </div>
        </Card>
    );
};

export default StatusCard;
