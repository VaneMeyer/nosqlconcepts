import axios from 'axios';

const API_URL = '/api';

export const fetchUserNames = async () => {
    try {
      const response = await axios.get(`${API_URL}/getUsers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };
export const fetchExercises = async () => {
    try {
      const response = await axios.get(`${API_URL}/getexercises`);
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };
export const deleteExercise = async (statement_id, area_id) => {
    try {
      const response = await axios.post(`${API_URL}/delete-exercises`, {statement_id, area_id});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };
export const addExercise = async (formValues) => {
    try {
      const response = await axios.post(`${API_URL}/add-exercise`, {formValues});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };
export const updateExercise = async (formValues) => {
    try {
      const response = await axios.post(`${API_URL}/update-exercises`, {formValues});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };

  //to be implemented:
export const addAssignment = async (formValues) => {
    try {
      const response = await axios.post(`${API_URL}/add-assignment`, {formValues});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };

  export const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-assignments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };

  export const deleteAssignment = async (area_id) => {
    try {
      const response = await axios.post(`${API_URL}/delete-assignment`, {area_id});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };
  export const updateAssignment = async (formValues) => {
    try {
      const response = await axios.post(`${API_URL}/update-assignment`, {formValues});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };

  export const fetchStatus = async (areaId) => {
    try {
      const response = await axios.post(`${API_URL}/get-status`, {areaId});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };

  export const updateNewStatus = async (areaId, checked) => {
    try {
      const response = await axios.post(`${API_URL}/update-status`, {areaId, checked});
      return response.data;
    } catch (error) {
      console.error('Error fetching area names:', error);
      throw error;
    }
  };