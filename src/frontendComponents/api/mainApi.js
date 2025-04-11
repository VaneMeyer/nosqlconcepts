import axios from "axios";

const API_URL = "/api";

export const fetchAreaNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/area-names`);
    return response.data.map((area) => ({
      area_id: area.area_id,
      area_name: area.area_name,
    }));
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const fetchHistoryData = async (username, databasetype) => {
  try {
    const response = await axios.post(`${API_URL}/gethistory`, {
      username,
      databasetype,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchUserData = async (username, databasetype) => {
  try {
    const response = await axios.post(`${API_URL}/get-user-data`, {
      username,
      databasetype,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchTasksData = async (areaId) => {
  try {
    const response = await axios.post(`${API_URL}/getTasks`, {
      areaId,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const fetchTaskFormData = async (areaId, username, tasknumber) => {
  try {
    const response = await axios.post(`${API_URL}/getDataFromDB`, {
      areaId,
      username,
      tasknumber,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } 
};
export const postTaskFormData = async (dataToSend) => {
  try {
    const response = await axios.post(`${API_URL}/store-data`, {
      dataToSend,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export const postHistoryData = async (dataToSend) => {
  try {
    const response = await axios.post(`${API_URL}/store-history-data`, {
      dataToSend,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDbStructure = async (dbendpoint) => {
  try {
    const response = await axios.get(`${API_URL}${dbendpoint}`);
    return response;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const fetchDownloadData = async (areaId, username) => {
  try {
    const response = await axios.post(`${API_URL}/getDownloadDataFromDB`, {
      areaId,
      username,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTimerData = async (username, areaId, taskNumber) => {
  try {
    const response = await axios.post(`${API_URL}/gettimer`, {
      username,
      areaId,
      taskNumber,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching timer data", error);
    throw error;
  }
};

export const postTimerData = async (username, areaId, taskNumber, time) => {
  try {
    const response = await axios.post(`${API_URL}/posttimer`, {
      username,
      areaId,
      taskNumber,
      time,
    });
    return response.data.success;
  } catch (error) {
    console.error("Error posting timer data", error);
    throw error;
  }
};
