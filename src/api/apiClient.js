import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:4060",
    baseURL: "https://unicefprojectbackend-dj63.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;

