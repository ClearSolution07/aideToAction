import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
    setActiveChat,
    setMessages,
    addMessage,
} from "../../redux/slices/chatSlice";

import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import "./chat.css";
import SideBar from "../../components/SideBar";
import Layout from "antd/es/layout/layout";
import profile from "../../assets/profile.jpg";
import send from "../../assets/Vector.png";
import useUser from "../../hooks/useUser";
import useChat from "../../hooks/useChat";

const { Content } = Layout;

const socket = io("http://localhost:4060/", {
    transports: ["websocket"],
});

const ChatWindow = () => {
    const messagesFromRedux = useSelector((state) => state.chat.messages || []);
    const dispatch = useDispatch();
    const { getUserDetail, getAllUser } = useUser();
    const { fetchChatHistory, sendMessage, loading, error } = useChat();

    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [userList, setUserList] = useState([]);
    const [userStatus, setUserStatus] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [userName, setUserName] = useState("");

    const location = useLocation();
    const member = location.state?.member || location.state?.psychologist;
    //fetching the current user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserDetail();
                console.log("res", response.data[0].user_id);
                setUserName(response.data[0].full_name);
                if (response) {
                    const userId = response.data[0].user_id;
                    setSenderId(userId);

                    if (socket.connected) {
                        socket.emit("user_connected", { user_id: userId });
                    } else {
                        socket.on("connect", () => {
                            socket.emit("user_connected", { user_id: userId });
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching user details:", error.message);
            }
        };

        fetchUserDetails();
    }, []);

    //fetching the list of users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUser();
                setUserList(response.data);
            } catch (error) {
                console.error("Error fetching user list:", error.message);
            }
        };
        fetchUsers();
    }, []);

    // Fetch user list and online/offline status updates
    useEffect(() => {
        // Listen for user status updates from the server
        socket.on("user_status", (data) => {
            setUserStatus((prevStatus) => ({
                ...prevStatus,
                [data.user_id]: data.status, // Update status (online/offline)
            }));
        });

        return () => {
            socket.off("user_status"); // Clean up event listener on component unmount
        };
    }, []);

    // Filtered user list based on search input
    const filteredUsers = userList.filter((user) =>
        user.full_name.toLowerCase().includes(searchInput.toLowerCase())
    );

    //comparing the ids to set the receivd message in the store
    useEffect(() => {
        socket.on("chat_message", (message) => {
            if (message.sender_id === receiverId) {
                dispatch(addMessage(message));
            }
        });

        return () => {
            socket.off("chat_message");
        };
    }, [receiverId, dispatch]);

    //sending the new message to db, store and socket
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && senderId && receiverId) {
            const messageObj = {
                sender_id: senderId,
                receiver_id: receiverId,
                content: newMessage,
                message_id: (messagesFromRedux.data?.length || 0) + 1,
                timestamp: new Date().toISOString(),
            };

            try {
                await sendMessage({
                    sender_id: senderId,
                    receiver_id: receiverId,
                    message: newMessage,
                    timestamp: new Date().toISOString(),
                });
                dispatch(addMessage(messageObj)); // Update Redux
                socket.emit("chat_message", messageObj); // Send via socket
                setNewMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    //selecting the user from user list
    const selectChat = async (user) => {
        setReceiverId(user.user_id);
        setReceiverName(user.full_name);
        dispatch(setActiveChat(user.full_name));

        if (senderId && user.user_id) {
            try {
                const updatedMessage = await fetchChatHistory({
                    sender_id: senderId,
                    receiver_id: user.user_id,
                });

                if (updatedMessage && updatedMessage.data) {
                    console.log("Fetched Chat History:", updatedMessage.data);
                    dispatch(setMessages(updatedMessage.data)); // Update Redux store with chat history
                } else {
                    console.log("No chat history available.");
                    dispatch(setMessages([])); // Clear Redux store
                }
            } catch (error) {
                console.error("Error fetching chat history:", error.message);
            }
        }
    };

    useEffect(() => {
        if (member) {
            console.log("Chatting with", member);
            setReceiverId(member.user_id);
            setReceiverName(member.full_name);

            const fetchChatHistoryData = async () => {
                const senderId = localStorage.getItem("userId");

                console.log("sender_id from localStorage:", senderId);
                if (!senderId) {
                    console.error("Session over, login again");
                    return;
                }

                try {
                    const updatedMessage = await fetchChatHistory({
                        sender_id: Number(senderId),
                        receiver_id: member.user_id,
                    });

                    if (updatedMessage?.data) {
                        console.log(
                            "Fetched Chat History:",
                            updatedMessage.data
                        );
                        dispatch(setMessages(updatedMessage.data));
                    } else {
                        console.log("No chat history available.");
                        dispatch(setMessages([]));
                    }
                } catch (error) {
                    console.error(
                        "Error fetching chat history:",
                        error.message
                    );
                }
            };

            fetchChatHistoryData();
        }
    }, [member]);

    // Hook for auto-scroll
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectChat]);

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
                <Content>
                    <div className="main-container">
                        <div className="user-info-container">
                            <img
                                src={profile}
                                alt="User"
                                className="user-image"
                            />
                            <div className="user-details-container">
                                <div className="user-name">
                                    {userName || "User Name"}
                                </div>
                                <div className="user-des">
                                    Web Designer & Best-Selling Instructor
                                </div>
                            </div>
                        </div>
                        <div className="chat-container">
                            <div className="sidebar">
                                <div className="sidebar-header">Message</div>
                                <div className="search-container">
                                    <div className="search-wrapper">
                                        <Search className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="search-input"
                                            value={searchInput}
                                            onChange={(e) =>
                                                setSearchInput(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="chat-list">
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.user_id}
                                            className={`chat-list-item ${
                                                userStatus[user.user_id] ===
                                                "online"
                                                    ? "online"
                                                    : "offline"
                                            }`}
                                            onClick={() => selectChat(user)}
                                            style={{
                                                backgroundColor:
                                                    receiverId === user.user_id
                                                        ? "#FFDDD1"
                                                        : "transparent",
                                            }}
                                        >
                                            <div className="avatar" />
                                            <div className="chat-info">
                                                <div className="chat-name">
                                                    {user.full_name}
                                                </div>
                                                <div className="chat-preview">
                                                    {userStatus[
                                                        user.user_id
                                                    ] === "online"
                                                        ? "Active Now"
                                                        : "Offline"}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="main-chat">
                                <div className="chat-header">
                                    <div className="header-user-info">
                                        <div className="avatar" />
                                        <div className="user-details">
                                            <div className="user-name">
                                                {receiverName ||
                                                    "Select a Chat"}
                                            </div>
                                            <div className="user-status">
                                                {userStatus[receiverId] ===
                                                "online"
                                                    ? "Active Now"
                                                    : "Offline"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="messages-container">
                                    {loading ? (
                                        <p>Loading messages...</p>
                                    ) : error ? (
                                        <p>Error: {error}</p>
                                    ) : (
                                        <div className="messages-area">
                                            {Array.isArray(messagesFromRedux) &&
                                            messagesFromRedux.length > 0 ? (
                                                [...messagesFromRedux]
                                                    .sort(
                                                        (a, b) =>
                                                            new Date(
                                                                a.timestamp
                                                            ) -
                                                            new Date(
                                                                b.timestamp
                                                            )
                                                    )
                                                    .map((msg) => (
                                                        <div
                                                            key={msg.message_id}
                                                            className={`message ${
                                                                msg.sender_id ===
                                                                senderId
                                                                    ? "sent"
                                                                    : "received"
                                                            }`}
                                                        >
                                                            {msg.sender_id !==
                                                                senderId && (
                                                                <div className="avatar small" />
                                                            )}
                                                            <div className="message-content">
                                                                <p>
                                                                    {
                                                                        msg.content
                                                                    }
                                                                </p>
                                                                <span className="timestamp">
                                                                    {new Date(
                                                                        msg.timestamp
                                                                    ).toLocaleTimeString(
                                                                        [],
                                                                        {
                                                                            hour: "2-digit",
                                                                            minute: "2-digit",
                                                                        }
                                                                    )}
                                                                </span>
                                                            </div>
                                                            {/* Dummy element for scrolling */}
                                                            <div
                                                                ref={
                                                                    messagesEndRef
                                                                }
                                                            ></div>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div className="no-messages">
                                                    <p className="no-messages-title">
                                                        No messages yet
                                                    </p>
                                                    <p className="no-messages-subtitle">
                                                        Start a conversation!
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                ;
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
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleSendMessage(e);
                                                    }
                                                }}
                                                placeholder="Type a message"
                                                className="message-input"
                                            />
                                        </div>
                                        <div
                                            className="input-actions"
                                            onClick={handleSendMessage}
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
