import apiClient from "./apiClient";

export const saveChat = async (data) => {
    try {
        const response = await apiClient.post("/chat/save_chat", {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const getChat = async (data) => {
    try {
        const response = await apiClient.post("chat/get_chat", {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};
