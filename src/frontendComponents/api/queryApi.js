import axios from 'axios';

const API_URL = '/api';

export const sendToExecute = async (apiRoute,  execQuery, taskNumber, taskAreaId ) => {
    try {
      const response = await axios.post(`${API_URL}${apiRoute}`, {
        execQuery, taskNumber, taskAreaId
      });
  
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };