import apiClient from "./apiClient";

export const getUserDetails = async () => {
    try {
        const response = await apiClient.post("auth/get_current_user");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const getAllUsers = async () => {
    try {
        const response = await apiClient.post("auth/get_all_users");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};