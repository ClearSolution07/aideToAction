import apiClient from "./apiClient";

export const updateUserData = async (userData) => {
    try {
        const response = await apiClient.post("users/update_user", userData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

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

export const updatePassword = async (userData) => {
    try {
        const response = await apiClient.post(
            "/users/update_password",
            userData
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};
