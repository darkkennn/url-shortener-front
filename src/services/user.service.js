import api from './api';
import API_ENDPOINTS from '../constants/api';

const userService = {
  createShortUrl: async (url, userId, token) => {
    try {
      const response = await api.post(API_ENDPOINTS.URL.CREATE, { url, userId }, token);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getUserUrls: async (token) => {
    try {
      const response = await api.get(API_ENDPOINTS.URL.USER_URLS, token);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;