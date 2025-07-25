import axios from "axios";

const API_URL = "/api";

export const fetchTaskChartData = async () => {
  try {
    const response = await axios.post(`${API_URL}/solved-tasks-count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user chart data:", error);
    throw error;
  }
};

export const fetchUserTaskChartData = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/user-solved-tasks-count`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user chart data:", error);
    throw error;
  }
};

export const fetchTimeChartData = async () => {
  try {
    const response = await axios.post(`${API_URL}/avg-processing-time`);
    return response.data;
  } catch (error) {
    console.error("Error fetching time chart data:", error);
    throw error;
  }
};
export const fetchUserTimeChartData = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/user-avg-processing-time`, {
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
    const response = await axios.post(`${API_URL}/get-history-data`, {
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
    const response1 = await axios.get(`${API_URL}/difficulty-rating-easy`);
    const response2 = await axios.get(`${API_URL}/difficulty-rating-difficult`);
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
    const response = await axios.get(`${API_URL}/total-users`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rating data:", error);
    throw error;
  }
};
export const fetchPieChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/difficulty-level`);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rating data:", error);
    throw error;
  }
};