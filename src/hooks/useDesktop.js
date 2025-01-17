import { useState } from "react";
import { getNumberOfUser, getDashboardContent } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDesktop = () => {
  const [dashboardContent, setDashboardContent] = useState(null);
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

  return {
    dashboardContent,
    loading,
    error,
    getUserCount,
    getContent,
  };
};

export default useDesktop;
