import axios from 'axios';
const API_URL = '/api';
export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}/get-data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchUserByUsername = async (username) => {
    try {
      const response = await axios.get(`${API_URL}/get-user-by-username/${username}`);
      return response.data; // returns user or null (no user found)
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw error;
    }
  };

export const addUser = async (formValues) => {
    try {
        console.log(formValues, "api.js");
        const response = await axios.post(`${API_URL}/add-user`, formValues);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

export const updateUser = async (formValues) => {
    try {
        console.log(formValues, "api.js");
        const response = await axios.put(`${API_URL}/update-user`, formValues);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (username) => {
    try {
        const response = await axios.delete(`${API_URL}/delete-user/${username}`);
        return response.data; // returns data from answer f.e. "success message" 
    } catch (error) {
        console.error('Fehler beim Löschen des Benutzers:', error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Fehler beim Login:', error);
        throw error;
    }
};
