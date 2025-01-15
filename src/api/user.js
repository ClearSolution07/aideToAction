import apiClient from "./apiClient";

export const getUserDetails = async () => {
    try {
        const response = await apiClient.post("users/get_current_user");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const getAllUsers = async () => {
    try {
        const response = await apiClient.post("users/get_all_users");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const getAllMembers = async () => {
    try {
        const response = await apiClient.post("users/get_all_members");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const getAllPsychologists = async () => {
    try {
        const response = await apiClient.post("users/get_all_psychologists");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};