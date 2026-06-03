// Central API configuration
export const API_ROOT = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API = `${API_ROOT}/api`;
export const UPLOADS = `${API_ROOT}/uploads`;

export default {
  API_ROOT,
  API,
  UPLOADS,
};
