import React, { useState } from "react";
import logo from "../../img/l3.jpeg";
import "./Connect.css";
import {
    MessageOutlined,
    ArrowRightOutlined,
    LeftOutlined,
} from "@ant-design/icons";
import ChatWindow from "../chat/chat";

const Connect = () => {
    const [showChat, setShowChat] = useState(false);

    const handleChatClick = () => setShowChat(true);
    const handleBackClick = () => setShowChat(false);

    return (
        <div className="connect-container">
            {!showChat ? (
                <>
                    <h1>
                        A safe and supportive space for you to connect, share,
                        and grow!
                    </h1>
                    <p className="subheading">
                        Engage in meaningful conversations, exchange ideas, and
                        explore diverse cultures. This is your community—a place
                        to find support, build friendships, and uplift each
                        other.
                    </p>
                    <div className="card">
                        <img src={logo} alt="icon" className="card-icon" />
                        <div className="card-content">
                            <p>
                                <ArrowRightOutlined className="arrow-icon" /> Be
                                respectful
                            </p>
                            <p>
                                <ArrowRightOutlined className="arrow-icon" />{" "}
                                Forward only educational, development, or
                                job-related forwards
                            </p>
                            <p>
                                <ArrowRightOutlined className="arrow-icon" />{" "}
                                This space will be as useful as you make it
                            </p>
                            <p>
                                <ArrowRightOutlined className="arrow-icon" />{" "}
                                Your chats here are fully protected
                            </p>
                        </div>
                    </div>
                    <button className="chat-button" onClick={handleChatClick}>
                        <MessageOutlined className="button-icon" /> Chat Now
                    </button>

                    <p className="disclaimer">
                        <strong>*Disclaimer*</strong> Saarthi - AICL is not
                        responsible for your decision to share personal or any
                        other information on this platform. You may or may not
                        choose to share personal details or phone numbers or
                        connect with any other user on any external
                        app/platform/in-person. Saarthi is not responsible or
                        accountable for whom you choose to meet or share details
                        or your mutual interactions with other users.
                    </p>
                </>
            ) : (
                <div className="chat-window-container">
                    <button className="back-button" onClick={handleBackClick}>
                        <LeftOutlined /> Back
                    </button>
                    <ChatWindow />
                </div>
            )}
        </div>
    );
};

export default Connect;
