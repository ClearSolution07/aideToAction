import { useState } from "react";
import {
    getUserDetails,
    getAllUsers,
    getAllMembers,
    getAllPsychologists,
    updateUserData,
    updatePassword,
} from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserDetail = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getUserDetails();
            setUser(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const getAllUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getAllUsers();
            setUser(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const getMembers = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getAllMembers();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const getPsychologists = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getAllPsychologists();
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const handleUserDataSubmit = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await updateUserData(userData);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const handleUpdatePassword = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const data = await updatePassword(userData);
            await AsyncStorage.setItem("authToken", data.token);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };
    return {
        user,
        loading,
        error,
        getUserDetail,
        getAllUser,
        getMembers,
        getPsychologists,
        handleUserDataSubmit,
        handleUpdatePassword,
    };
};

export default useUser;
