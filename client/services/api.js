import { API_BASE } from '../config/constants';

const getHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  signup: async (name, email, password) => {
    const res = await fetch(`${API_BASE}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return res.json();
  },
  getMe: async () => {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Properties
  getProperties: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/api/properties?${query}`);
    return res.json();
  },
  getPropertyById: async (id) => {
    const res = await fetch(`${API_BASE}/api/properties/${id}`);
    return res.json();
  },

  // Cart
  getCart: async () => {
    const res = await fetch(`${API_BASE}/api/cart`, {
      headers: getHeaders(),
    });
    return res.json();
  },
  addToCart: async (propertyId) => {
    const res = await fetch(`${API_BASE}/api/cart`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ propertyId }),
    });
    return res.json();
  },
  removeFromCart: async (propertyId) => {
    const res = await fetch(`${API_BASE}/api/cart/${propertyId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return res.json();
  },
  checkInCart: async (propertyId) => {
    const res = await fetch(`${API_BASE}/api/cart/check/${propertyId}`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // Recommendations
  getRecommendations: async () => {
    const res = await fetch(`${API_BASE}/api/recommendations`, {
      headers: getHeaders(),
    });
    return res.json();
  },
};
