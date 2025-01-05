import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "lucide-react";
import { addMessage, setActiveChat } from "../../redux/slices/chatSlice";
import "./chat.css";
import SideBar from "../../components/SideBar";
import Layout from "antd/es/layout/layout";
import HeaderComponent from "../../components/HeaderComponent";
import profile from "../../assets/profile.jpg";
import send from "../../assets/Vector.png";
const { Content } = Layout;

const ChatWindow = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    const activeChat = useSelector((state) => state.chat.activeChat);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const sendMessage = () => {
        if (newMessage.trim()) {
            dispatch(
                addMessage({
                    text: newMessage,
                    sender: "You",
                    timestamp: new Date().toLocaleTimeString(),
                })
            );
            setNewMessage("");
        }
    };

    const selectChat = (chatName) => {
        dispatch(setActiveChat(chatName));
    };

    return (
        <Layout>
            <SideBar
                visible={sidebarVisible}
                tabletVisible={false}
                onClose={() => setSidebarVisible(false)}
                isMobileWidth={true}
            />
            <Layout
                style={{
                    marginLeft: 0,
                    transition: "margin-left 0.3s ease",
                    minHeight: "100vh",
                }}
            >
                <HeaderComponent
                    onMenuClick={toggleSidebar}
                    isMobileWidth={true}
                    headerText={"Chat Window"}
                />
                <Content>
                    <div className="main-container">
                        <div className="user-info-container">
                            <img
                                src={profile}
                                alt="User"
                                className="user-image"
                            />
                            <div className="user-details-container">
                                <div className="user-name">user name</div>
                                <div className="user-des">user description</div>
                            </div>
                        </div>
                        <div className="chat-container">
                            {/* Left Sidebar */}
                            <div className="sidebar">
                                <div className="sidebar-header">Message</div>
                                <div className="search-container">
                                    <div className="search-wrapper">
                                        <Search className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="search-input"
                                        />
                                    </div>
                                </div>

                                <div className="chat-list">
                                    {["Suporte ADMIN", "Chat 1", "Chat 2"].map(
                                        (chat, i) => (
                                            <div
                                                key={i}
                                                className={`chat-list-item ${
                                                    activeChat === chat
                                                        ? "active"
                                                        : ""
                                                }`}
                                                onClick={() => selectChat(chat)}
                                            >
                                                <div className="avatar" />
                                                <div className="chat-info">
                                                    <div className="chat-name">
                                                        {chat}
                                                    </div>
                                                    <div className="chat-preview">
                                                        Pesquisar chat
                                                    </div>
                                                </div>
                                                {i === 1 && (
                                                    <div className="unread-badge">
                                                        1
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Main Chat Area */}
                            <div className="main-chat">
                                <div className="chat-header">
                                    <div className="header-user-info">
                                        <div className="avatar" />
                                        <div className="user-details">
                                            <div className="user-name">
                                                {activeChat || "Select a Chat"}
                                            </div>
                                            <div className="user-status">
                                                ONLINE
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="messages-container">
                                    <div className="messages-area">
                                        {messages.map((msg, index) => (
                                            <div
                                                key={index}
                                                className={`message ${
                                                    msg.sender === "You"
                                                        ? "sent"
                                                        : "received"
                                                }`}
                                            >
                                                <div
                                                    className={`avatar ${
                                                        msg.sender === "You"
                                                            ? ""
                                                            : "small"
                                                    }`}
                                                />
                                                <div className="message-content">
                                                    <p>{msg.text}</p>
                                                    <span className="timestamp">
                                                        {msg.timestamp}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="input-box">
                                    <div className="input-container">
                                        <div className="input-wrapper">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) =>
                                                    setNewMessage(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Type a message"
                                                className="message-input"
                                            />
                                        </div>
                                        <div
                                            className="input-actions"
                                            onClick={sendMessage}
                                        >
                                            <div className="sent-text">
                                                Send
                                            </div>
                                            <img
                                                src={send}
                                                alt="Send"
                                                className="send-icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ChatWindow;
