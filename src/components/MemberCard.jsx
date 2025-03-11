import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { memberProfile } from "../utils/imageUtils";
import "./css/memberCard.css";

const MemberCard = ({
    user_id,
    full_name,
    description,
    user_picture,
    specialization,
    navigateToChat,
}) => {
    return (
        <div className="member-card">
            <div className="member-card-content">
                <div className="member-image-container">
                    <img
                        src={user_picture || memberProfile}
                        alt={full_name}
                        className="member-image"
                    />
                </div>

                <div className="member-info">
                    <h3 className="member-name">{full_name}</h3>
                    <p className="member-specialization">{specialization}</p>
                    <p className="member-description">{description}</p>

                    <Button
                        type="text"
                        icon={<SendOutlined />}
                        className="send-message-button"
                        onClick={() => navigateToChat({ user_id, full_name })}
                    >
                        Send Message
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
