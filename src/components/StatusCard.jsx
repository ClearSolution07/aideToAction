import {Card, Typography} from "antd";
import './css/statusCard.css';

const {Title, Link, Text} = Typography;

const StatusCard = ({name, count, text, color, linkColor}) => {
    return (
        <Card
            style={{
                backgroundColor: color,
            }}
            className={'cardContainer'}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontWeight: "bold",
                }}
            >
                <Text type="primary" style={{fontSize: "20px", fontWeight: "bold"}}>
                    {name}
                </Text>
                <Text style={{fontSize: "24px"}}>{count}</Text>
                <Link style={{color: linkColor}}>{text}</Link>
            </div>
        </Card>
    );
};

export default StatusCard;
