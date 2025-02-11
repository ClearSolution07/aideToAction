import { useState } from "react";
import {
    getNumberOfUser,
    getDashboardContent,
    getStateWiseResource,
} from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDesktop = () => {
    const [dashboardContent, setDashboardContent] = useState(null);
    const [stateWiseResource, setStateWiseResource] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUserCount = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getNumberOfUser();
            setDashboardContent(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };
    const getContent = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getDashboardContent();
            setDashboardContent(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const getStateWiseContent = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found");

            const data = await getStateWiseResource();
            setStateWiseResource(data);
            setLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return {
        dashboardContent,
        loading,
        error,
        getUserCount,
        getContent,
        getStateWiseContent,
        stateWiseResource,
    };
};

export default useDesktop;
