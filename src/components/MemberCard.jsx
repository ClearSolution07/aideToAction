import { useState } from "react";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { memberProfile } from "../utils/imageUtils";
import UserFormModal from "../pages/chat/UserFormModal.jsx";
import "./css/memberCard.css";

const MemberCard = ({
    user_id,
    full_name,
    description,
    user_picture,
    specialization,
    navigateToChat,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
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
                    <Button
                        type="text"
                        icon={<SendOutlined />}
                        className="send-message-button"
                        onClick={() => setModalOpen(true)}
                    >
                        Request an Appointemt
                    </Button>

                    <UserFormModal
                        user_id={user_id}
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
