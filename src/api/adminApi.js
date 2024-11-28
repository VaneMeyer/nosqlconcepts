import axios from "axios";

const API_URL = "/api";

export const fetchUserNames = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchExercises = async () => {
  try {
    const response = await axios.get(`${API_URL}/exercises`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error;
  }
};

export const deleteExercise = async (statement_id, area_id) => {
  try {
    const response = await axios.delete(`${API_URL}/exercise`, {
      data: { statement_id, area_id }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    throw error;
  }
};

export const addExercise = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/exercise`, { formValues });
    return response.data;
  } catch (error) {
    console.error("Error adding exercise:", error);
    throw error;
  }
};

export const updateExercise = async (formValues) => {
  try {
    const response = await axios.put(`${API_URL}/exercise`, { formValues });
    return response.data;
  } catch (error) {
    console.error("Error updating exercise:", error);
    throw error;
  }
};
export const addAssignment = async (formValues) => {
  try {
    const response = await axios.post(`${API_URL}/assignment`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const fetchAssignments = async () => {
  try {
    const response = await axios.get(`${API_URL}/assignments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const deleteAssignment = async (area_id) => {
  try {
    const response = await axios.delete(`${API_URL}/assignment`, {
      area_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};
export const updateAssignment = async (formValues) => {
  try {
    const response = await axios.put(`${API_URL}/assignment`, {
      formValues,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const fetchStatus = async (areaId) => {
  try {
    const response = await axios.get(`${API_URL}/task/status`, { areaId });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const updateNewStatus = async (areaId, checked) => {
  try {
    const response = await axios.put(`${API_URL}/task/status`, {
      areaId,
      checked,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};
export const deleteUserData = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${username}`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const deleteAllUserData = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/delete-alluserdata`, {
      username,
    });
    const response2 = await axios.post(`${API_URL}/delete-allhistorydata`, {
      username,
    });
    return (response.data, response2.data);
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};

export const fetchUserTaskData = async () => {
  try {
    const response = await axios.get(`${API_URL}/getUserTaskData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};
export const fetchHistoryData = async () => {
  try {
    const response = await axios.get(`${API_URL}/getHistoryData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching area names:", error);
    throw error;
  }
};