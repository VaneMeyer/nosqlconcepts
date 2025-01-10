import axios from "axios";

const API_URL = "/api";

export const fetchTaskChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/tasks/solved`); // No change needed
    return response.data;
  } catch (error) {
    console.error("Error fetching user chart data:", error);
    throw error;
  }
};
export const fetchUserTaskChartData = async (area_id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      area_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user chart data:", error);
    throw error;
  }
};

export const fetchTimeChartData = async () => {
  try { 
    const response = await axios.get(`${API_URL}/analytics/time/average`);
    return response.data;
  } catch (error) {
    console.error("Error fetching time chart data:", error);
    throw error;
  }
};
export const fetchUserTimeChartData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/user/time/average`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching time chart data:", error);
    throw error;
  }
};
export const fetchLineChartData = async (username, limit) => {
  try {
    const response = await axios.get(`${API_URL}/analytics/user/history`, {
      username,
      limit,
    });

    const data = response.data.map(item => ({
      ...item,
      x: new Date(item.x).toISOString(), 
    }));
    return [
      { id: "queryHistory", data: data.reverse() },
    ];
  } catch (error) {
    console.error("Error fetching time chart data:", error);
    throw error;
  }
};
export const fetchRankingData = async () => {
  try {
    const response1 = await axios.get(`${API_URL}/difficulty/easy`);
    const response2 = await axios.get(`${API_URL}/difficulty/difficult`);
    return {
      easy: response1.data,
      difficult: response2.data
    };
  } catch (error) {
    console.error("Error fetching rating data:", error);
    throw error;
  }
};
export const fetchTotalUsersData = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/count`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rating data:", error);
    throw error;
  }
};
export const fetchPieChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/difficulty`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rating data:", error);
    throw error;
  }
};