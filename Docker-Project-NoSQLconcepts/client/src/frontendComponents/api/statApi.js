import axios from 'axios';

const API_URL = '/api';

/**
 * Fetches main data from the API.
 * @returns {Promise<Array>} Array of main data objects.
 */
export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

/**
 * Fetches task-related data from the API.
 * @returns {Promise<Array>} Array of task-related data objects.
 */
export const fetchTaskData = async (selectedTaskAreaId) => {
  try {
    const response = await axios.post(`${API_URL}/task_data`, {selectedTaskAreaId});
    return response.data;
  } catch (error) {
    console.error('Error fetching task data:', error);
    throw error;
  }
};

/**
 * Fetches user-related data from the API.
 * @returns {Promise<Array>} Array of user-related data objects.
 */
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user_data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

/**
 * Fetches area-related data from the API.
 * @returns {Promise<Array>} Array of area-related data objects.
 */
export const fetchAreaData = async () => {
  try {
    const response = await axios.get(`${API_URL}/area_data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching area data:', error);
    throw error;
  }
};