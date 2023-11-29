import axios from 'axios';

const apiService = axios.create({
  baseURL: 'https://fe-task-api.mainstack.io/',
  headers: {
    Accept: '*/*',
  },
});

export const sendRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const response = await apiService({
      method: method.toLowerCase(),
      url: endpoint,
      data: data,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error('Request was not successful');
    }
  } catch (error) {
    console.error('Error sending request:', error.message);
    throw error;
  }
};

export default apiService;
