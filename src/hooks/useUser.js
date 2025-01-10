import { useState } from "react";
import { getUserDetails, getAllUsers } from "../api";
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

    return {
        user,
        loading,
        error,
        getUserDetail,
        getAllUser,
    };
};

export default useUser;
