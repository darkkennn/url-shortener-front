const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3000',
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
  },
  URL: {
    CREATE: '/api/create',
    USER_URLS: '/api/user',
    REDIRECT: (shortCode) => `/${shortCode}`,
  },
};

export default API_ENDPOINTS;