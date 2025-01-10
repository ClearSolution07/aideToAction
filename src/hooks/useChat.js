import { useState } from "react";
import { saveChat, getChat } from "../api";
import { useDispatch } from "react-redux";

const useChat = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [messages, setMessages] = useState([]);

    // Fetch chat history for the selected user
    const fetchChatHistory = async (chatData) => {
        setError(null);
        setLoading(true);
        try {
            const chatHistory = await getChat(chatData);
            setMessages(chatHistory.data);
            return chatHistory;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Function to send a message
    const sendMessage = async (message) => {
        dispatch({
            type: "ADD_MESSAGE",
            payload: message,
        });
        setError(null);
        try {
            await saveChat(message);
        } catch (err) {
            setError(err.message);
        }
    };

    return {
        loading,
        error,
        messages,
        fetchChatHistory,
        sendMessage,
    };
};

export default useChat;
