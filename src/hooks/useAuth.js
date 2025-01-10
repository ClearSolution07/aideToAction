import { useState } from "react";
import { login, signUp, logout } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await login(email, password);
            await AsyncStorage.setItem("authToken", data.token);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const handleSignUp = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signUp(userData);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logout();
            await AsyncStorage.removeItem("authToken");
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return {
        loading,
        error,
        handleLogin,
        handleSignUp,
        handleLogout,
    };
};

export default useAuth;
