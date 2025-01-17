import apiClient from "./apiClient";

export const getNumberOfUser = async () => {
  try {
    const response = await apiClient.post("dashboard/get_user_stats");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const getDashboardContent = async () => {
  try {
    const response = await apiClient.post("dashboard/get_dashboard_content");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
