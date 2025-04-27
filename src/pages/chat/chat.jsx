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
import send from "../../assets/Vector.png";
import chat from "../../assets/chatImage.png";
import PencilLine from "../../assets/PencilLine.png";
import useUser from "../../hooks/useUser";
import useChat from "../../hooks/useChat";

const socket = io("https://unicefprojectbackend-dj63.onrender.com/", {
    transports: ["websocket"],
});

const ChatWindow = ({ member: memberProp }) => {
    const messagesFromRedux = useSelector((state) => state.chat.messages || []);
    const dispatch = useDispatch();
    const { getUserDetail, getAllUser } = useUser();
    const { fetchChatHistory, sendMessage, loading, error } = useChat();

    const [newMessage, setNewMessage] = useState("");
    const [userList, setUserList] = useState([]);
    const [userStatus, setUserStatus] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [receiverName, setReceiverName] = useState("");
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserDes, setCurrentUserDes] = useState("");
    const [currentUserProfileImage, setCurrentUserProfileImage] = useState("");
    const [unseenMessages, setUnseenMessages] = useState({});
    const [latestMessages, setLatestMessages] = useState({});
    const [chatOpened, setChatOpened] = useState(false);

    const location = useLocation();
    const member =
        memberProp || location.state?.member || location.state?.psychologist;

    const getRelativeTime = (timestamp) => {
        const time = new Date(timestamp);
        const now = new Date();
        const diffInMs = now - time;
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) return `${diffInSeconds} sec`;
        if (diffInMinutes < 60) return `${diffInMinutes} min`;
        if (diffInHours < 24) return `${diffInHours} hr`;
        if (diffInDays === 1) return "yesterday";
        return time.toLocaleDateString([], {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const ChatWindowformatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();

        const isToday =
            today.getDate() === messageDate.getDate() &&
            today.getMonth() === messageDate.getMonth() &&
            today.getFullYear() === messageDate.getFullYear();

        const isYesterday =
            today.getDate() - messageDate.getDate() === 1 &&
            today.getMonth() === messageDate.getMonth() &&
            today.getFullYear() === messageDate.getFullYear();

        if (isToday) {
            return messageDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        } else if (isYesterday) {
            return "Yesterday";
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    //fetching the current user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await getUserDetail();
                setCurrentUserName(response.data[0].full_name);
                setCurrentUserDes(response.data[0].description);
                setCurrentUserProfileImage(response.data[0].user_picture);
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

    useEffect(() => {
        socket.on("active_users", (activeUsers) => {
            setUserStatus((prevStatus) => {
                const updatedStatus = { ...prevStatus };
                activeUsers.forEach((userId) => {
                    updatedStatus[userId] = "online";
                });
                Object.keys(updatedStatus).forEach((userId) => {
                    if (!activeUsers.includes(userId)) {
                        updatedStatus[userId] = "offline";
                    }
                });

                return updatedStatus;
            });
        });

        return () => {
            socket.off("active_users");
        };
    }, []);

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

    useEffect(() => {
        socket.on("user_status", (data) => {
            setUserStatus((prevStatus) => ({
                ...prevStatus,
                [data.user_id]: data.status,
            }));
        });

        return () => {
            socket.off("user_status");
        };
    }, []);

    const filteredUsers = userList.filter(
        (user) =>
            user.full_name &&
            user.full_name.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        socket.on("chat_message", (message) => {
            if (message.sender_id !== receiverId) {
                setUnseenMessages((prev) => ({
                    ...prev,
                    [message.sender_id]: (prev[message.sender_id] || 0) + 1,
                }));
            } else {
                dispatch(addMessage(message));
            }

            setLatestMessages((prev) => ({
                ...prev,
                [message.sender_id]: message.content,
            }));
        });

        return () => {
            socket.off("chat_message");
        };
    }, [receiverId, dispatch]);

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

            setLatestMessages((prev) => ({
                ...prev,
                [receiverId]: newMessage,
            }));

            setUnseenMessages((prev) => ({
                ...prev,
                [receiverId]: 0,
            }));
            try {
                await sendMessage({
                    sender_id: senderId,
                    receiver_id: receiverId,
                    message: newMessage,
                    timestamp: new Date().toISOString(),
                });
                dispatch(addMessage(messageObj));
                socket.emit("chat_message", messageObj);
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
        setChatOpened(true);

        setUnseenMessages((prev) => ({
            ...prev,
            [user.user_id]: 0,
        }));

        setLatestMessages((prev) => ({
            ...prev,
            [user.user_id]: null,
        }));

        if (senderId && user.user_id) {
            try {
                const updatedMessage = await fetchChatHistory({
                    sender_id: senderId,
                    receiver_id: user.user_id,
                });

                if (updatedMessage) {
                    dispatch(setMessages(updatedMessage.data));
                } else {
                    dispatch(setMessages([]));
                }
            } catch (error) {
                console.error("Error fetching chat history:", error.message);
            }
        }
    };

    useEffect(() => {
        if (member) {
            setReceiverId(member.user_id);
            setReceiverName(member.full_name);

            const fetchChatHistoryData = async () => {
                const senderId = localStorage.getItem("userId");

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
                        dispatch(setMessages(updatedMessage.data));
                    } else {
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

    const messagesContainerRef = useRef(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const threshold = 20;
        const isAtBottom = scrollHeight - scrollTop - clientHeight <= threshold;

        if (isAtBottom) {
            setShowScrollToBottom(false);
        } else {
            setShowScrollToBottom(true);
        }
    };

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const onScroll = (e) => handleScroll(e);
        container.addEventListener("scroll", onScroll);

        return () => {
            container.removeEventListener("scroll", onScroll);
        };
    }, []);

    useEffect(() => {
        if (member) {
            selectChat(member);
        }
    }, [member]);

    useEffect(() => {
        scrollToBottom();
    }, [messagesFromRedux]);

    return (
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
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                </div>

                <div className="chat-list">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.user_id}
                            className={`chat-list-item ${
                                userStatus[user.user_id] === "online"
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
                            <div className="avatar">
                                {user.user_picture ? (
                                    <img
                                        src={user.user_picture}
                                        alt="User"
                                        className="avatar"
                                    />
                                ) : null}

                                <div
                                    className={`status-indicator ${
                                        userStatus[user.user_id] === "online"
                                            ? "online"
                                            : "offline"
                                    }`}
                                ></div>
                            </div>
                            <div className="chat-info">
                                <div className="chat-name-container">
                                    <div className="chat-name">
                                        {user.full_name}
                                    </div>
                                    <div className="chat-time">
                                        {getRelativeTime(user.timestamp)}
                                    </div>
                                </div>
                                <div className="chat-preview">
                                    {latestMessages[user.user_id] ||
                                        user.content}
                                    {unseenMessages[user.user_id] > 0 && (
                                        <span className="unseen-count">
                                            {unseenMessages[user.user_id]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="main-chat">
                {/* Display the chat header only if a user is selected */}
                {receiverId && (
                    <div className="chat-header">
                        <div className="header-user-info">
                            <div className="avatar">
                                {(() => {
                                    const user = filteredUsers.find(
                                        (user) => user.user_id === receiverId
                                    );
                                    return user?.user_picture ? (
                                        <img
                                            src={user.user_picture}
                                            className="user-picture"
                                            alt="User"
                                        />
                                    ) : null;
                                })()}
                            </div>

                            <div className="user-details">
                                <div className="user-name">
                                    {receiverName || "Select a Chat"}
                                </div>
                                <div className="user-status">
                                    {userStatus[receiverId] === "online"
                                        ? "Active Now"
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="messages-container" ref={messagesContainerRef}>
                    <div className="mess">
                        {loading ? (
                            <p className="loading-messages">
                                <span className="message-text">
                                    Loading messages
                                </span>
                                <span className="dots">...</span>
                            </p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : (
                            <div
                                className={`messages-area ${
                                    chatOpened ? "white-bg" : "black-bg"
                                }`}
                            >
                                {Array.isArray(messagesFromRedux) &&
                                chatOpened &&
                                messagesFromRedux.length > 0 ? (
                                    [...messagesFromRedux]
                                        .sort(
                                            (a, b) =>
                                                new Date(a.timestamp) -
                                                new Date(b.timestamp)
                                        )
                                        .map((msg) => {
                                            const messageUser =
                                                filteredUsers.find(
                                                    (user) =>
                                                        user.user_id ===
                                                        msg.sender_id
                                                );
                                            return (
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
                                                        senderId &&
                                                    messageUser &&
                                                    messageUser.user_picture ? (
                                                        <div className="avatar small">
                                                            <img
                                                                src={
                                                                    messageUser.user_picture
                                                                }
                                                                className="user-picture-inside-chat"
                                                                alt="User Avatar"
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div className="message-content">
                                                        <p>{msg.content}</p>
                                                        <span className="timestamp">
                                                            {ChatWindowformatTimestamp(
                                                                msg.timestamp
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    <div className="no-messages">
                                        <img
                                            src={chat}
                                            alt="User"
                                            className="chat-image"
                                        />
                                        <p className="no-messages-title">
                                            No messages yet
                                        </p>
                                        <p className="no-messages-subtitle">
                                            Start a conversation!
                                        </p>
                                        <p className="no-messages-encrypted">
                                            Your personal messages are
                                            end-to-end encrypted
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {showScrollToBottom && messagesFromRedux.length > 0 && (
                    <div className="scroll-to-bottom-container">
                        <button
                            className="scroll-to-bottom"
                            onClick={scrollToBottom}
                        >
                            ⬇
                        </button>
                    </div>
                )}

                {/* Display the input box only if a user is selected */}
                {receiverId && (
                    <div className="input-box">
                        <div className="input-container">
                            <div className="input-wrapper">
                                <img
                                    src={PencilLine}
                                    alt=""
                                    className="pencilLine-image"
                                />
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
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
                                <div className="sent-text">Send</div>
                                <img
                                    src={send}
                                    alt="Send"
                                    className="send-icon"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
