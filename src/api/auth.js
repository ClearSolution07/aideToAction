import apiClient from "./apiClient";

export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email,
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
        localStorage.removeItem("accessToken");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};