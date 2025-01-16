import { useState } from "react";
import { getNumberOfUser } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useDesktop = () => {
  const [userCount, setUserCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserCount = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No auth token found");

      const data = await getNumberOfUser();
      setUserCount(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    userCount,
    loading,
    error,
    getUserCount,
  };
};

export default useDesktop;
