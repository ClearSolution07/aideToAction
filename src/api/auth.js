import apiClient from "./apiClient";

export const login = async (email_address, password) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email_address,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const signUp = async (userData) => {
    try {
        const response = await apiClient.post("/auth/register_user", userData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.post("/auth/logout");
        localStorage.removeItem("authToken");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};
