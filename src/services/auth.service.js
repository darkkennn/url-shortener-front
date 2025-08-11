import api from './api';
import API_ENDPOINTS from '../constants/api';

const authService = {
  register: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;