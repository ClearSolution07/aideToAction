import apiClient from "./apiClient";

// Login function
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

// Sign-up function
export const signUp = async (userData) => {
    try {
        const response = await apiClient.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};

// Logout function
export const logout = async () => {
    try {
        const response = await apiClient.post("/auth/logout");
        // Optionally, clear local storage or AsyncStorage
        localStorage.removeItem("accessToken"); // Or AsyncStorage for React Native
        return response.data;
    } catch (error) {
        throw new Error(
            error.response ? error.response.data.message : error.message
        );
    }
};
